"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { useApp } from "@/context/AppProviders";
import { site } from "@/data/site";

// Pendulum feel: ~0.8s period, each swing a bit smaller than the last.
const PENDULUM = { type: "spring", stiffness: 60, damping: 4.2, mass: 1, restDelta: 0.01 } as const;
const LIMIT = 32; // deg before the strap starts resisting
const MAX_FLING = 650; // deg/s cap on release velocity

const toDeg = (rad: number) => (rad * 180) / Math.PI;

// Past the limit the card keeps moving, but with increasing resistance.
const rubberBand = (a: number) => {
  const abs = Math.abs(a);
  return abs <= LIMIT ? a : Math.sign(a) * (LIMIT + (abs - LIMIT) * 0.3);
};

export default function HangingProfileCard() {
  const { t, lang } = useApp();
  const reducedMotion = useReducedMotion();
  const [dragging, setDragging] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const grab = useRef<{ id: number; offset: number } | null>(null);
  const swingAnim = useRef<ReturnType<typeof animate> | null>(null);
  const angle = useMotionValue(0);
  const tiltX = useSpring(0, { stiffness: 150, damping: 18 });
  const tiltY = useSpring(0, { stiffness: 150, damping: 18 });
  // Foil position follows the hover tilt and the pendulum swing.
  const holoPosition = useTransform(
    [tiltX, tiltY, angle] as MotionValue<number>[],
    ([x, y, a]: number[]) => `${50 + y * 3 + a * 1.8}% ${50 - x * 3}%`
  );

  const swingFrom = (velocity: number) => {
    swingAnim.current?.stop();
    swingAnim.current = animate(angle, 0, { ...PENDULUM, velocity });
  };

  useEffect(() => () => swingAnim.current?.stop(), []);

  // Angle of the pointer around the strap's pivot (0 = straight below).
  // Uses layout offsets, which ignore the rig's current rotation.
  const pointerAngle = (x: number, y: number) => {
    const scene = sceneRef.current;
    const rig = rigRef.current;
    if (!scene || !rig) return 0;
    const box = scene.getBoundingClientRect();
    const pivotX = box.left + rig.offsetLeft + rig.offsetWidth / 2;
    const pivotY = box.top + rig.offsetTop;
    // CSS rotate is clockwise, which swings the bottom to the left.
    return -toDeg(Math.atan2(x - pivotX, y - pivotY));
  };

  const release = () => {
    if (!grab.current) return;
    grab.current = null;
    setDragging(false);
    const v = Math.max(-MAX_FLING, Math.min(MAX_FLING, angle.getVelocity()));
    swingFrom(v);
  };

  const move = (event: PointerEvent<HTMLButtonElement>) => {
    if (reducedMotion) return;
    if (grab.current?.id === event.pointerId) {
      angle.set(rubberBand(pointerAngle(event.clientX, event.clientY) + grab.current.offset));
      return;
    }
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    tiltY.set(((event.clientX - rect.left) / rect.width - 0.5) * 10);
    tiltX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 7);
  };

  return (
    <div ref={sceneRef} className="badge-scene">
      {/* The entrance drop + settle swing is pure CSS (.badge-drop) so it
          plays as soon as the page paints, without waiting for hydration. */}
      <div className="badge-drop">
      <motion.div
        ref={rigRef}
        className="badge-rig"
        style={{ rotate: reducedMotion ? 0 : angle }}
      >
        <div className="badge-strap" aria-hidden="true"><span>OBADA • DEVELOPER • OBADA • DEVELOPER</span></div>
        <div className="badge-clip" aria-hidden="true" />
        <motion.button
          type="button"
          className="profile-badge"
          data-dragging={dragging}
          style={{ rotateX: reducedMotion ? 0 : tiltX, rotateY: reducedMotion ? 0 : tiltY }}
          onPointerDown={(event) => {
            if (reducedMotion || !event.isPrimary || event.button !== 0) return;
            swingAnim.current?.stop();
            grab.current = {
              id: event.pointerId,
              offset: angle.get() - pointerAngle(event.clientX, event.clientY),
            };
            event.currentTarget.setPointerCapture(event.pointerId);
            setDragging(true);
            tiltX.set(0);
            tiltY.set(0);
          }}
          onPointerMove={move}
          onPointerUp={release}
          onPointerCancel={release}
          onLostPointerCapture={release}
          onBlur={release}
          onPointerLeave={() => { if (!grab.current) { tiltX.set(0); tiltY.set(0); } }}
          onKeyDown={(event) => {
            if (reducedMotion || !["ArrowLeft", "ArrowRight", " ", "Enter"].includes(event.key)) return;
            event.preventDefault();
            // A keyboard nudge: give the badge a push in that direction.
            swingFrom(event.key === "ArrowRight" ? -220 : 220);
          }}
        >
          <span className="badge-slot" aria-hidden="true" />
          {/* Holographic foil: drifts with the tilt and the swing */}
          <motion.span
            aria-hidden="true"
            className="badge-holo"
            style={reducedMotion ? undefined : { backgroundPosition: holoPosition }}
          />
          <span className="badge-cover">
            <span className="badge-cover-noise" />
            <CoverTraces />
            <span className="badge-photo-ring">
              <span className="badge-photo">
                {/* Pre-cropped head-and-shoulders shot (public/profile-badge.jpg) */}
                <Image
                  src="/profile-badge.jpg"
                  alt=""
                  fill
                  priority
                  quality={85}
                  sizes="134px"
                  draggable={false}
                  className="badge-photo-img"
                />
              </span>
              <span className="badge-verified" title={t.badge.verified}>
                <FiCheck strokeWidth={3.5} />
              </span>
            </span>
          </span>
          <span className="badge-details">
            <span className="badge-name">{t.hero.firstName} {t.hero.lastName}</span>
            <span className="badge-role" dir="ltr">
              <i />
              {site.role}
              <i />
            </span>
          </span>
          <span className="badge-shine" aria-hidden="true" />
          {/* The visible text names the button; this adds how to use it */}
          <span className="sr-only">
            {lang === "ar" ? "اسحب أفقيًا أو استخدم السهمين لتحريكها." : "Drag horizontally or use arrow keys to swing."}
          </span>
        </motion.button>
      </motion.div>
      </div>
      <span className="badge-hint">{lang === "ar" ? "اسحب البطاقة وحرّكها" : "Grab the card & give it a swing"}</span>
    </div>
  );
}


// Faint circuit traces for the header (echoing the site background), with a
// slow light pulse on a few of them. Fades out around the portrait.
const coverTraces = [
  "M0 42 H58 L78 62 H118",
  "M300 36 H238 L218 56 H182",
  "M0 100 H36 L56 120 H86",
  "M300 108 H260 L242 126 H214",
  "M44 0 V16 L60 32 H96",
  "M258 0 V18 L242 34 H204",
];
const coverNodes: [number, number][] = [
  [118, 62],
  [182, 56],
  [86, 120],
  [214, 126],
  [96, 32],
  [204, 34],
];

function CoverTraces() {
  return (
    <svg className="badge-traces" viewBox="0 0 300 176" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {coverTraces.map((d) => (
        <path key={d} d={d} className="badge-trace" />
      ))}
      {[0, 3, 4].map((i) => (
        <path
          key={`p${i}`}
          d={coverTraces[i]}
          className="badge-trace-pulse"
          style={{ animationDelay: `${i * -1.3}s` }}
        />
      ))}
      {coverNodes.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.2" className="badge-trace-node" />
      ))}
    </svg>
  );
}
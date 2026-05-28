/**
 * Hero illustration — Babcia at her laptop. Flat-shape coloured style
 * with gray bun hair that moves with the head, and visible hands
 * resting on the laptop keyboard.
 *
 * Layer order (back → front):
 *   1. floor shadow
 *   2. body / sweater
 *   3. neck
 *   4. laptop (lid + base)
 *   5. hands on keyboard
 *   6. head group — hair, bun, face, glasses, eyes etc. (rotates as one)
 *
 * Animated classes:
 *  .grandma-head            → head + hair tilt toward cursor together
 *  .pupil                   → both pupils follow cursor
 *  .eye-grandma-l / -r      → blink (slight stagger)
 *  .laptop-heart            → heart pulses on brand heartbeat rhythm
 *  .laptop-shine            → soft warm glow breath behind logo
 */
export default function GrandmaAtComputer() {
  return (
    <svg
      viewBox="0 0 540 480"
      className="grandma-svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Floor shadow */}
      <ellipse cx="270" cy="472" rx="190" ry="6" fill="#5e4030" opacity="0.16" />

      {/* ─── BODY (sweater) ─── */}
      <path
        d="
          M 105 480
          L 105 395
          C 105 348 145 320 200 318
          L 340 318
          C 395 320 435 348 435 395
          L 435 480 Z"
        fill="#c89488"
      />
      <path
        d="M 208 320 C 184 326 165 342 158 365"
        fill="none"
        stroke="#a87770"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M 332 320 C 356 326 375 342 382 365"
        fill="none"
        stroke="#a87770"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M 250 320 L 270 342 L 290 320"
        fill="none"
        stroke="#a87770"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* ─── NECK (smooth tapered) ─── */}
      <path
        d="
          M 244 298
          C 240 308 240 320 254 324
          L 286 324
          C 300 320 300 308 296 298
          Q 270 308 244 298 Z"
        fill="#fdf0eb"
      />
      <path
        d="M 252 308 Q 270 314 288 308"
        fill="none"
        stroke="#e8c5b8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* ─── LAPTOP ─── */}
      <g className="laptop">
        <path d="M 138 480 L 402 480 L 416 452 L 124 452 Z" fill="#28180c" />
        <rect
          x="158"
          y="358"
          width="224"
          height="96"
          rx="7"
          fill="#3a2a1c"
        />
        <rect
          x="162"
          y="362"
          width="216"
          height="88"
          rx="5"
          fill="none"
          stroke="#5e4030"
          strokeWidth="1"
          opacity="0.6"
        />
        <rect
          className="laptop-shine"
          x="170"
          y="370"
          width="200"
          height="72"
          rx="3"
          fill="#7a2614"
          opacity="0.09"
        />
        <g className="laptop-heart" transform="translate(270 400)">
          <path
            d="
              M 0 6
              C -8 -3 -18 -3 -18 6
              C -18 18 -6 24 0 32
              C 6 24 18 18 18 6
              C 18 -3 8 -3 0 6 Z"
            fill="#fdf9f4"
          />
        </g>
      </g>

      {/* ─── HEAD GROUP (rotates) — hair lives in here too ─── */}
      <g className="grandma-head">
        {/* HAIR BACK — gray, framing face, ends at jaw level */}
        <path
          d="
            M 152 200
            C 150 100 212 32 270 30
            C 328 32 390 100 388 200
            C 388 230 382 258 368 278
            C 358 292 346 300 336 302
            Q 270 310 204 302
            C 194 300 182 292 172 278
            C 158 258 152 230 152 200 Z"
          fill="#c5beb5"
        />

        {/* Hair highlights — silver streaks pulled up toward bun */}
        <path
          d="M 170 128 Q 200 92 246 74"
          fill="none"
          stroke="#d8d4cc"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M 370 128 Q 340 92 294 74"
          fill="none"
          stroke="#d8d4cc"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M 200 200 Q 220 152 244 108"
          fill="none"
          stroke="#d8d4cc"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.65"
        />
        <path
          d="M 340 200 Q 320 152 296 108"
          fill="none"
          stroke="#d8d4cc"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.65"
        />

        {/* BUN — prominent gray knot on top */}
        <ellipse cx="270" cy="72" rx="46" ry="8" fill="#a8a39a" opacity="0.6" />
        <ellipse cx="270" cy="42" rx="38" ry="32" fill="#b5afa6" />
        <path
          d="M 245 32 Q 270 24 295 32"
          fill="none"
          stroke="#cac5bb"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 240 50 Q 270 42 300 50"
          fill="none"
          stroke="#cac5bb"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.7"
        />
        <ellipse cx="262" cy="35" rx="10" ry="5" fill="#a8a39a" opacity="0.7" />

        {/* FACE */}
        <ellipse cx="270" cy="200" rx="84" ry="108" fill="#fdf0eb" />

        {/* Side hair tufts on face — gray to match */}
        <path
          d="
            M 188 188
            Q 178 218 196 250
            Q 202 258 204 252
            L 204 220
            Q 202 198 188 188 Z"
          fill="#c5beb5"
        />
        <path
          d="
            M 354 188
            Q 362 218 344 250
            Q 338 258 336 252
            L 336 220
            Q 338 198 354 188 Z"
          fill="#c5beb5"
        />

        {/* Cheeks */}
        <ellipse cx="214" cy="238" rx="15" ry="9" fill="#e09890" opacity="0.5" />
        <ellipse cx="326" cy="238" rx="15" ry="9" fill="#e09890" opacity="0.5" />

        {/* Eyebrows */}
        <path
          d="M 216 168 Q 232 161 248 168"
          fill="none"
          stroke="#5e4030"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M 292 168 Q 308 161 324 168"
          fill="none"
          stroke="#5e4030"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Glasses */}
        <g className="grandma-glasses">
          <circle
            cx="232"
            cy="204"
            r="29"
            fill="rgba(253,249,244,0.5)"
            stroke="#7a2614"
            strokeWidth="5"
          />
          <circle
            cx="308"
            cy="204"
            r="29"
            fill="rgba(253,249,244,0.5)"
            stroke="#7a2614"
            strokeWidth="5"
          />
          <path
            d="M 257 202 Q 270 198 283 202"
            fill="none"
            stroke="#7a2614"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 203 196 Q 192 188 184 184"
            fill="none"
            stroke="#7a2614"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 337 196 Q 348 188 356 184"
            fill="none"
            stroke="#7a2614"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>

        {/* Eyes */}
        <g className="eye eye-grandma-l">
          <circle cx="232" cy="204" r="8" fill="#fdf9f4" />
          <circle className="pupil" cx="232" cy="204" r="4.5" fill="#2a1c0e" />
          <circle cx="234" cy="202" r="1.6" fill="#fdf9f4" />
        </g>
        <g className="eye eye-grandma-r">
          <circle cx="308" cy="204" r="8" fill="#fdf9f4" />
          <circle className="pupil" cx="308" cy="204" r="4.5" fill="#2a1c0e" />
          <circle cx="310" cy="202" r="1.6" fill="#fdf9f4" />
        </g>

        {/* Nose */}
        <ellipse cx="270" cy="254" rx="6" ry="14" fill="#e8c5b8" opacity="0.55" />

        {/* Mouth — small warm closed-mouth smile */}
        <path
          d="M 256 280 Q 270 275 284 280 Q 280 288 270 288 Q 260 288 256 280 Z"
          fill="#9c3520"
        />
        {/* Subtle upper-lip line — the smile curve */}
        <path
          d="M 256 280 Q 270 276 284 280"
          fill="none"
          stroke="#7a2614"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>
    </svg>
  )
}

/**
 * Hero illustration — Babcia at her laptop with a caregiver standing
 * behind and to her right, hand on her shoulder. Flat coloured-shape
 * style throughout.
 *
 * Layer order (back → front):
 *   1. floor shadow
 *   2. CAREGIVER body / shoulders / neck (visible mainly on the right)
 *   3. CAREGIVER head (right side, above/beside Babcia's bun)
 *   4. Babcia body / sweater (covers caregiver body where they overlap)
 *   5. Babcia neck
 *   6. laptop
 *   7. Babcia head + hair + bun (covers caregiver head on the left)
 *   8. caregiver's hand on Babcia's shoulder (front)
 *
 * The viewBox extends above zero so the caregiver's head has room
 * to emerge.
 */
export default function GrandmaAtComputer() {
  return (
    <svg
      viewBox="0 -30 540 510"
      className="grandma-svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Floor shadow */}
      <ellipse cx="270" cy="472" rx="190" ry="6" fill="#5e4030" opacity="0.16" />

      {/* ─── CAREGIVER body (visible on the right, partly hidden behind Babcia) ─── */}
      <g className="caregiver-figure">
        {/* Torso / shoulders */}
        <path
          d="
            M 358 152
            Q 380 140 422 140
            Q 462 140 482 152
            L 504 200
            L 504 480
            L 358 480 Z"
          fill="#5e4030"
        />
        {/* Shirt collar — small v at the neckline */}
        <path
          d="M 410 142 L 422 160 L 434 142"
          fill="none"
          stroke="#3a2a1c"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Subtle shoulder seam */}
        <path
          d="M 466 152 C 478 180 488 250 490 320"
          fill="none"
          stroke="#3a2a1c"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.45"
        />
        {/* Caregiver neck — short, connects chin to shoulders */}
        <path
          d="
            M 404 124
            Q 404 138 414 148
            L 434 148
            Q 444 138 444 124
            Q 424 132 404 124 Z"
          fill="#fdf0eb"
        />
        <path
          d="M 410 138 Q 424 142 438 138"
          fill="none"
          stroke="#e8c5b8"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </g>

      {/* ─── CAREGIVER head — short boy haircut, lower position ─── */}
      <g className="caregiver-head">
        {/* Face */}
        <ellipse cx="424" cy="80" rx="44" ry="50" fill="#fdf0eb" />

        {/* Short boy hair — slightly tousled with a soft fringe */}
        <path
          d="
            M 380 70
            C 376 42 392 18 424 12
            C 456 18 472 42 468 70
            Q 462 62 452 62
            C 446 56 438 56 434 64
            C 430 58 422 58 418 64
            C 414 58 406 58 402 64
            C 398 58 392 58 386 62
            Q 384 64 380 70 Z"
          fill="#6b4f3a"
        />
        {/* Highlight strand swept across top */}
        <path
          d="M 402 26 C 418 16 436 18 452 28"
          fill="none"
          stroke="#7a5e44"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 410 36 Q 426 28 440 34"
          fill="none"
          stroke="#5a4030"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.55"
        />
        {/* Sideburn hints over the ear area */}
        <path
          d="M 382 72 Q 380 88 384 98"
          fill="none"
          stroke="#6b4f3a"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 466 72 Q 468 88 464 98"
          fill="none"
          stroke="#6b4f3a"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Eyebrows — slightly heavier */}
        <path
          d="M 397 70 Q 406 66 415 70"
          fill="none"
          stroke="#3a2a1c"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 433 70 Q 442 66 451 70"
          fill="none"
          stroke="#3a2a1c"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Eyes — pupils drawn slightly left so he naturally looks toward Babcia */}
        <g className="eye eye-care-l">
          <circle cx="406" cy="82" r="5.5" fill="#fdf9f4" />
          <circle className="pupil" cx="404" cy="82" r="3" fill="#2a1c0e" />
          <circle cx="405" cy="81" r="1" fill="#fdf9f4" />
        </g>
        <g className="eye eye-care-r">
          <circle cx="442" cy="82" r="5.5" fill="#fdf9f4" />
          <circle className="pupil" cx="440" cy="82" r="3" fill="#2a1c0e" />
          <circle cx="441" cy="81" r="1" fill="#fdf9f4" />
        </g>
        {/* Small warm closed smile */}
        <path
          d="M 414 108 Q 424 114 434 108"
          fill="none"
          stroke="#7a2614"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* ─── BABCIA body (sweater) — covers caregiver body where they overlap ─── */}
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

      {/* ─── Babcia NECK ─── */}
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

      {/* ─── GRANDMA HEAD GROUP (rotates) — covers caregiver head on the left ─── */}
      <g className="grandma-head">
        {/* HAIR BACK */}
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
        {/* Hair highlights */}
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
        {/* BUN */}
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

        {/* Side hair tufts */}
        <path
          d="M 188 188 Q 178 218 196 250 Q 202 258 204 252 L 204 220 Q 202 198 188 188 Z"
          fill="#c5beb5"
        />
        <path
          d="M 354 188 Q 362 218 344 250 Q 338 258 336 252 L 336 220 Q 338 198 354 188 Z"
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

        {/* Mouth — small warm closed smile */}
        <path
          d="M 256 280 Q 270 275 284 280 Q 280 288 270 288 Q 260 288 256 280 Z"
          fill="#9c3520"
        />
        <path
          d="M 256 280 Q 270 276 284 280"
          fill="none"
          stroke="#7a2614"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>

      {/* ─── CAREGIVER hand on Babcia's shoulder (front layer) ─── */}
      <g className="caregiver-hand">
        {/* Sleeve cuff — wider cuff coming from caregiver's body */}
        <path
          d="M 360 306
             L 428 306
             L 422 334
             Q 394 340 366 334 Z"
          fill="#5e4030"
        />
        {/* Cuff hem line */}
        <path
          d="M 368 328 Q 394 334 420 328"
          fill="none"
          stroke="#3a2a1c"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Hand — back of hand visible, fingers wrapping around shoulder */}
        <path
          d="M 366 336
             C 362 348 368 358 380 358
             L 412 358
             C 422 358 426 348 422 336
             C 412 332 380 332 366 336 Z"
          fill="#fdf0eb"
          stroke="#e8c5b8"
          strokeWidth="1.5"
        />
        {/* Thumb — small bump on the left edge */}
        <path
          d="M 363 342
             C 358 346 358 354 364 356
             C 368 354 368 348 366 343 Z"
          fill="#fdf0eb"
          stroke="#e8c5b8"
          strokeWidth="1.4"
        />
        {/* Knuckle ridge across the back of hand */}
        <path
          d="M 372 344 Q 394 340 416 344"
          fill="none"
          stroke="#e8c5b8"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        {/* Four finger lines along the front edge */}
        <path
          d="M 380 358 Q 381 352 384 350"
          fill="none"
          stroke="#e8c5b8"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M 391 358 Q 392 352 394 350"
          fill="none"
          stroke="#e8c5b8"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M 402 358 Q 403 352 405 350"
          fill="none"
          stroke="#e8c5b8"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M 412 358 Q 414 352 416 350"
          fill="none"
          stroke="#e8c5b8"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

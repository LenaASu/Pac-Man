// ======================================================
//                 PAC-MAN GAME ENGINE
//     Final Cleaned, Fully Fixed Version (2025)
// ======================================================

// Maze Data (0:Wall, 1:Path, 2:Pellet, 3:Power Pellet, 4:Ghost Cage, 5:Pac-Man Start)
const PACMAN_MAZE = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0],
    [0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
    [0,3,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,3,0],
    [0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
    [0,2,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,2,0],
    [0,2,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,2,0],
    [0,2,2,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,2,2,0],
    [0,0,0,0,0,0,2,0,0,0,0,0,1,0,0,1,0,0,0,0,0,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,0,0,0,1,0,0,1,0,0,0,0,0,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,1,1,1,1,1,1,1,1,1,1,0,0,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,1,0,0,0,4,4,0,0,0,1,0,0,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,1,0,4,4,4,4,4,4,0,1,0,0,2,0,0,0,0,0,0],
    [1,1,1,1,1,1,2,1,1,1,0,4,4,4,4,4,4,0,1,1,1,2,1,1,1,1,1,1],
    [0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,2,0,0,1,1,1,1,1,1,1,1,1,1,0,0,2,0,0,0,0,0,0],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0],
    [0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
    [0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
    [0,3,2,2,0,0,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,0,0,2,2,3,0],
    [0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,2,0,0,0],
    [0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,2,0,0,0],
    [0,2,2,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,2,2,0],
    [0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0],
    [0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,5,1,2,2,2,2,2,2,2,2,2,2,2,2,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

// ======================================================
//                 GHOST INITIAL POSITIONS
// ======================================================

const CHARACTERS = {
    // Speed reduced to 0.9 and state initialized to "escape"
    traveler: { r:14, c:13, direction:'up',  class:'traveler-graphic', element:null, speedMultiplier:0.9, tick:0, role:"blinky", state: "escape" },
    albedo:   { r:14, c:14, direction:'up',  class:'albedo-graphic',   element:null, speedMultiplier:0.9, tick:0, role:"pinky",  state: "escape" },
    aino:     { r:14, c:12, direction:'up',  class:'aino-graphic',     element:null, speedMultiplier:0.9, tick:0, role:"inky",   state: "escape" },
    flins:    { r:14, c:15, direction:'up',  class:'flins-graphic',    element:null, speedMultiplier:0.9, tick:0, role:"clyde",  state: "escape" }
};

// ======================================================
//                GLOBAL GAME VARIABLES
// ======================================================

const WALL = 0;
const PATH = 1;
const PELLET = 2;
const POWER_PELLET = 3;
const GHOST_CAGE = 4;
const PACMAN_START = 5;

let pacmanCurrentRow = 27;
let pacmanCurrentCol = 13;

let score = 0;
let lives = 3;
let isPaused = false;

let currentDirection = 'right';
let nextDirection = 'right';

let ghostsActivated = false;

let gameLoopInterval = null;
const GAME_SPEED = 150;
const GAME_SPEED_SECONDS = GAME_SPEED / 1000;

let pacmanGraphicElement = null;
let cellSize = 0;

// ======================================================
//                HELPER FUNCTIONS
// ======================================================

// Return DOM cell
function getGridCell(r, c) {
    const grid = document.getElementById("maze-grid");
    const idx = r * PACMAN_MAZE[0].length + c;
    return grid.children[idx] || null;
}

function updateScoreboard() {
    document.getElementById("current-score").textContent = score;
    document.getElementById("lives").textContent = lives;
}

// ======================================================
//       CREATE GHOST GRAPHICS + UPDATE POSITIONS
// ======================================================

function createCharacterGraphics() {
    const grid = document.getElementById("maze-grid");
    for (const name in CHARACTERS) {
        const char = CHARACTERS[name];
        const elem = document.createElement("div");
        elem.classList.add("ghost-graphic", char.class);
        grid.appendChild(elem);
        char.element = elem;
    }
    updateCharacterVisualPositions();
}

function updateCharacterVisualPositions() {
    if (cellSize === 0) return;
    for (const name in CHARACTERS) {
        const char = CHARACTERS[name];
        const elem = char.element;
        elem.style.setProperty('--game-speed', `${GAME_SPEED_SECONDS}s`);
        // Use a small transition time if the ghost just left the cage to ensure smooth movement out of the gate
        // This is a stylistic choice and can be adjusted
        const transitionSpeed = (char.r <= 12 && char.state === "escape") ? `${GAME_SPEED_SECONDS/2}s` : `${GAME_SPEED_SECONDS}s`;
        elem.style.transition = `transform ${transitionSpeed} linear`;
        elem.style.transform = `translate(${char.c*cellSize}px, ${char.r*cellSize}px)`;
    }
}

// ======================================================
//                PAC-MAN VISUAL UPDATE
// ======================================================

function updatePacmanVisualPosition() {
    if (!pacmanGraphicElement || cellSize === 0) return;

    pacmanGraphicElement.style.setProperty('--game-speed', `${GAME_SPEED_SECONDS}s`);
    pacmanGraphicElement.style.transform =
        `translate(${pacmanCurrentCol*cellSize}px, ${pacmanCurrentRow*cellSize}px)`;

    pacmanGraphicElement.classList.remove("pacman-up","pacman-down","pacman-left","pacman-right");
    pacmanGraphicElement.classList.add(`pacman-${currentDirection}`);
}

// ======================================================
//                MOVEMENT VALIDATION
// ======================================================
// CLEANED: Only validates move and returns potential next coordinates/warp status.
function checkNextMove(direction, r=pacmanCurrentRow, c=pacmanCurrentCol, entity="player") {
    let nr = r, nc = c;
    const maxCols = PACMAN_MAZE[0].length;

    switch(direction) {
        case "up": nr--; break;
        case "down": nr++; break;
        case "left": nc--; break;
        case "right": nc++; break;
    }

    // --- WARP TUNNEL LOGIC: Calculates the post-warp coordinates ---
    let didWarp = false;
    if (nr === 14) {
        if (nc < 0) {
            nc = maxCols - 1;
            didWarp = true;
        }
        if (nc >= maxCols) {
            nc = 0;
            didWarp = true;
        }
    }
    
    // If the move resulted in a warp, it is always valid and should bypass all other checks
    if (didWarp) {
        return { valid:true, nextR:nr, nextC:nc, didWarp:true };
    }

    // --- STANDARD VALIDATION (after potential warp check) ---

    // Out of bounds (non-warp)
    if (nr < 0 || nr >= PACMAN_MAZE.length) return { valid:false, nextR:nr, nextC:nc };
    if (nc < 0 || nc >= maxCols) return { valid:false, nextR:nr, nextC:nc };

    const tile = PACMAN_MAZE[nr][nc];

    // Walls always block
    if (tile === WALL) return { valid:false, nextR:nr, nextC:nc };

    // GHOST LOGIC: CAGE ENTRY/EXIT
    if (entity === "ghost") {
        const isCurrentGateTile = (r === 12 && (c === 13 || c === 14));
        const isTargetGateTile = (nr === 12 && (nc === 13 || nc === 14));
        const isStartingInCage = (PACMAN_MAZE[r][c] === GHOST_CAGE);
        const isTargetInCage = (PACMAN_MAZE[nr][nc] === GHOST_CAGE);
        
        // 1. Ghosts can always move within the cage tiles
        if (isStartingInCage && isTargetInCage) {
             return { valid:true, nextR:nr, nextC:nc, didWarp:false };
        }

        // 2. Ghosts can move from the cage (r=13, r=14) to the gate tiles (r=12)
        if (isStartingInCage && isTargetGateTile && direction === "up") {
            return { valid:true, nextR:nr, nextC:nc, didWarp:false };
        }

        // 3. Ghosts can move from the gate tiles (r=12) out to the path (r=11)
        if (isCurrentGateTile && direction === "up" && PACMAN_MAZE[nr][nc] === PATH) {
            return { valid:true, nextR:nr, nextC:nc, didWarp:false };
        }

        // 4. They cannot move through walls, unless they are at the gate moving up (handled by 2/3)
        if (PACMAN_MAZE[nr][nc] === WALL) return { valid:false, nextR:nr, nextC:nc, didWarp:false };
    }
    
    // Fallthrough for Pacman and valid ghost moves outside cage/gate
    return { valid:true, nextR:nr, nextC:nc, didWarp:false };
}

// ======================================================
//                    GAME LOOP
// ======================================================

function startGameLoop() {
    if (gameLoopInterval) return;
    gameLoopInterval = setInterval(() => {
        if (!isPaused) {
            movePacman();
            moveCharacters();
        }
    }, GAME_SPEED);
}

function stopGameLoop() {
    if (gameLoopInterval) {
        clearInterval(gameLoopInterval);
        gameLoopInterval = null;
    }
}

function togglePause() {
    if (!gameLoopInterval) {
        isPaused = false;
        startGameLoop();
        return;
    }
    isPaused = !isPaused;
}

// ======================================================
//          GHOST BEHAVIOR: AI TARGETING
// ======================================================

function manhattan(r1,c1,r2,c2) {
    return Math.abs(r1-r2)+Math.abs(c1-c2);
}

function getBlinkyTarget() {
    return { r:pacmanCurrentRow, c:pacmanCurrentCol };
}

function getPinkyTarget() {
    let r=pacmanCurrentRow, c=pacmanCurrentCol;
    switch(currentDirection) {
        case "up": r-=4; break;
        case "down": r+=4; break;
        case "left": c-=4; break;
        case "right": c+=4; break;
    }
    return {r,c};
}

function getInkyTarget() {
    const blinky = CHARACTERS.traveler;
    let r=pacmanCurrentRow, c=pacmanCurrentCol;

    switch(currentDirection) {
        case "up": r-=2; break;
        case "down": r+=2; break;
        case "left": c-=2; break;
        case "right": c+=2; break;
    }

    const vr = r - blinky.r;
    const vc = c - blinky.c;

    return { r: blinky.r + 2*vr, c: blinky.c + 2*vc };
}

function getClydeTarget(char) {
    const dist = manhattan(char.r, char.c, pacmanCurrentRow, pacmanCurrentCol);
    if (dist < 8) return { r: 27, c:0 }; // Scatter corner
    return { r: pacmanCurrentRow, c: pacmanCurrentCol };
}

function hasLineOfSight(r1,c1,r2,c2) {
    if (r1 === r2) {
        const [minC,maxC]=[Math.min(c1,c2),Math.max(c1,c2)];
        for (let c=minC+1;c<maxC;c++) if (PACMAN_MAZE[r1][c]===WALL) return false;
        return true;
    }
    if (c1 === c2) {
        const [minR,maxR]=[Math.min(r1,r2),Math.max(r1,r2)];
        for (let r=minR+1;r<maxR;r++) if (PACMAN_MAZE[r][c1]===WALL) return false;
        return true;
    }
    return false;
}

// CLEANED: Simplified no-U-turn logic to prevent oscillation.
function getPossibleMoves(r,c,currentDir,entity="player") {
    const dirs = ["up","down","left","right"];
    const out = [];

    for (const d of dirs) {
        const m = checkNextMove(d,r,c,entity);
        if (m.valid) {
            // No U-turn logic
            const reverse =
                (d==="up" && currentDir==="down") ||
                (d==="down" && currentDir==="up") ||
                (d==="left" && currentDir==="right") ||
                (d==="right" && currentDir==="left");

            // Only allow moves that are NOT a direct reversal
            if (!reverse) out.push({direction:d,r:m.nextR,c:m.nextC});
        }
    }
    
    // If we're trapped and the only non-reversing move is a reversal, allow it.
    if (out.length === 0) {
        // Find the reverse direction
        let reverseDir = "";
        if (currentDir === "up") reverseDir = "down";
        else if (currentDir === "down") reverseDir = "up";
        else if (currentDir === "left") reverseDir = "right";
        else if (currentDir === "right") reverseDir = "left";
        
        const m = checkNextMove(reverseDir,r,c,entity);
        if (m.valid) out.push({direction:reverseDir,r:m.nextR,c:m.nextC});
    }

    return out;
}

function chooseDirectionTowardsTarget(char,target) {
    const moves = getPossibleMoves(char.r,char.c,char.direction,"ghost");
    let best=null, bestDist=99999;

    for (const m of moves) {
        const dist = manhattan(m.r,m.c,target.r,target.c);
        if (dist < bestDist) {
            bestDist = dist;
            best = m;
        }
    }

    // If no best move is found, fall back to the first valid move
    return best || moves[0];
}

// ======================================================
//        MAIN GHOST MOVEMENT + ESCAPE LOGIC
// ======================================================

function moveCharacters() {
    if (!ghostsActivated) return;

    // Use this to determine if we need a standard visual update at the end
    let didWarpOccur = false;

    for (const name in CHARACTERS) {
        const char = CHARACTERS[name];

        // Apply speed multiplier
        char.tick += char.speedMultiplier;
        if (char.tick < 1) continue;
        char.tick -= 1;

        let mv = null; // Stores the chosen next move object
        let nextMoveCheckResult = null;
        let target = null;

        // ================================
        //       ESCAPE/CAGE LOGIC (NEW)
        // ================================
        
        // Ghost is currently in the cage (r=13 or r=14, or at gate r=12)
        const isInsideCageArea = (PACMAN_MAZE[char.r][char.c] === GHOST_CAGE || (char.r === 12 && (char.c === 13 || char.c === 14)));
        
        if (char.state === "escape" || isInsideCageArea) {
            
            let preferredDirection = "up";
            
            // If the ghost is inside the cage body (r=13 or r=14) and needs to move horizontally to align with the gate
            if (char.r >= 13 && (char.c < 13 || char.c > 14)) {
                
                // Determine the target column based on the ghost's role for better pathing
                const targetCol = (char.c < 13) ? 13 : 14; 
                preferredDirection = (char.c < targetCol) ? "right" : "left";
            }

            // Attempt the preferred move (UP, or horizontal toward center)
            nextMoveCheckResult = checkNextMove(preferredDirection, char.r, char.c, "ghost");
            
            if (nextMoveCheckResult.valid) {
                mv = nextMoveCheckResult;
                mv.direction = preferredDirection;
            } else {
                // If the preferred move is blocked (e.g., UP is blocked, or horizontal is blocked),
                // try the opposite horizontal direction if applicable (only inside r=13/14)
                if (char.r >= 13) {
                     const oppositeDir = (preferredDirection === "right") ? "left" : "right";
                     nextMoveCheckResult = checkNextMove(oppositeDir, char.r, char.c, "ghost");
                     if (nextMoveCheckResult.valid) {
                         mv = nextMoveCheckResult;
                         mv.direction = oppositeDir;
                     }
                }
            }


            // If a move was successfully chosen during escape/cage, update position
            if (mv && mv.valid) {
                char.r = mv.nextR;
                char.c = mv.nextC;
                char.direction = mv.direction || char.direction;
                
                // If they've reached the path outside the cage (row 11 or higher), switch to chase
                if (char.r < 12 && char.state === "escape") {
                    char.state = "chase";
                    // Fall through to chase logic to immediately pick a real target
                } else {
                    // Execute visual update and continue to next character
                    if (mv.didWarp) {
                         warpCharacter(char.element, char.r, char.c);
                         didWarpOccur = true;
                    }
                    // This ghost has moved one step and is still in the escape process
                    continue; 
                }
            }
        }

        // ================================
        //       CHASE/SCATTER MODE
        // ================================
        
        if (char.state === "chase" || char.state === "frightened") { 
            // ... (rest of the chase/scatter/target logic remains the same)
            // ... (Lines 438 to 476 remain the same)
            
            // Choose target based on role
            if (char.role === "blinky")      target = getBlinkyTarget();
            else if (char.role === "pinky")  target = getPinkyTarget();
            else if (char.role === "inky")   target = getInkyTarget();
            else if (char.role === "clyde")  target = getClydeTarget(char);

            // Line-of-sight override
            if (hasLineOfSight(char.r,char.c,pacmanCurrentRow,pacmanCurrentCol)) {
                target = { r:pacmanCurrentRow, c:pacmanCurrentCol };
            }

            // Move one step toward target
            const chosenMove = chooseDirectionTowardsTarget(char,target);
            
            if (chosenMove) {
                // Check move validity/warp status before committing coordinates
                nextMoveCheckResult = checkNextMove(chosenMove.direction, char.r, char.c, "ghost");
                
                char.r = nextMoveCheckResult.nextR;
                char.c = nextMoveCheckResult.nextC;
                char.direction = chosenMove.direction; // Direction comes from chosen move

                mv = nextMoveCheckResult;
                mv.direction = chosenMove.direction;
            }
        }

        // ================================
        //     FINAL POSITION UPDATE
        // ================================

        if (mv && mv.valid) {
            if (mv.didWarp) {
                warpCharacter(char.element, char.r, char.c);
                didWarpOccur = true;
            }
        }
    }

    // Call standard visual update for all non-warping ghosts.
    if (!didWarpOccur) {
        updateCharacterVisualPositions();
    }
}

// =======================================================
//                 UTILITY FUNCTION FOR WARP
// =======================================================
// CLEANED: Uses global cellSize.
function warpCharacter(element, newR, newC) {
    // 1. Disable the CSS transition
    element.style.transition = 'none';

    // 2. Immediately update the visual position (teleport)
    element.style.transform = `translate(${newC * cellSize}px, ${newR * cellSize}px)`;

    // 3. Force the browser to apply the style change before re-enabling transition
    element.offsetHeight; 

    // 4. Re-enable the CSS transition
    element.style.transition = 'transform var(--game-speed) linear';
}

// ======================================================
//                PAC-MAN MOVEMENT
// ======================================================
// CLEANED: Correctly handles position update and warp.

function movePacman() {
    if (isPaused) return;

    let dirTry = currentDirection;
    let step = { valid: false };

    // 1. Attempt turn
    if (nextDirection !== currentDirection) {
        step = checkNextMove(nextDirection);
        if (step.valid) {
            currentDirection = nextDirection;
            dirTry = nextDirection;
        }
    }

    // 2. Attempt movement with the final direction
    step = checkNextMove(dirTry);
    if (!step.valid) return;

    // --- EXECUTE MOVE ---
    
    // Update coordinates to the new (potentially warped) position
    pacmanCurrentRow = step.nextR;
    pacmanCurrentCol = step.nextC;

    // Activate ghosts on first move
    if (!ghostsActivated) ghostsActivated = true;

    // Eating
    const tile = PACMAN_MAZE[pacmanCurrentRow][pacmanCurrentCol];
    if (tile === PELLET || tile === POWER_PELLET) {
        PACMAN_MAZE[pacmanCurrentRow][pacmanCurrentCol] = PATH;
        score += (tile === PELLET) ? 10 : 50;

        const cell = getGridCell(pacmanCurrentRow,pacmanCurrentCol);
        // Ensure element exists before manipulating classes
        if (cell) {
             cell.classList.remove("pellet","power-pellet");
        }
    }

    // VISUAL UPDATE (Warp or standard)
    if (step.didWarp) {
        warpCharacter(pacmanGraphicElement, pacmanCurrentRow, pacmanCurrentCol);
    } else {
        updatePacmanVisualPosition();
    }
    
    updateScoreboard();
}

// ======================================================
//                KEYBOARD INPUT
// ======================================================

function handleKeyDown(e) {
    const key = e.key;

    // Space = Pause
    if (key === " ") {
        e.preventDefault();
        togglePause();
        return;
    }

    // Movement keys
    const dirs = {
        "i":"up","I":"up",
        "k":"down","K":"down",
        "j":"left","J":"left",
        "l":"right","L":"right"
    };

    if (dirs[key]) e.preventDefault();
    if (isPaused) return;

    if (dirs[key]) {
        nextDirection = dirs[key];

        if (!gameLoopInterval) {
            const { valid } = checkNextMove(nextDirection);
            if (valid) {
                currentDirection = nextDirection;
                startGameLoop();
            }
        }
    }
}

// ======================================================
//                TOUCH INPUT
// ======================================================

let touchStartX = 0, touchStartY = 0;
const SWIPE_THRESHOLD = 50;

function handleTouchSwipe() {
    const grid = document.getElementById("maze-grid");

    grid.addEventListener("touchstart", e => {
        e.preventDefault();
        const t = e.touches[0];
        touchStartX = t.clientX;
        touchStartY = t.clientY;
    }, { passive:false });

    grid.addEventListener("touchend", e => {
        const t = e.changedTouches[0];
        const dx = t.clientX - touchStartX;
        const dy = t.clientY - touchStartY;

        const dist = Math.sqrt(dx*dx + dy*dy);

        if (dist < SWIPE_THRESHOLD) {
            togglePause();
            return;
        }

        if (isPaused) return;

        let dir = null;
        if (Math.abs(dx) > Math.abs(dy)) dir = dx > 0 ? "right" : "left";
        else dir = dy > 0 ? "down" : "up";

        nextDirection = dir;

        if (!gameLoopInterval) {
            const {valid} = checkNextMove(dir);
            if (valid) {
                currentDirection = dir;
                startGameLoop();
            }
        }
    }, { passive:false });

    grid.addEventListener("touchmove", e => e.preventDefault(), { passive:false });
}

// ======================================================
//               SCREEN RESIZING
// ======================================================

function resizeMaze() {
    const grid = document.getElementById("maze-grid");
    if (grid.offsetWidth > 0) {
        cellSize = grid.offsetWidth / PACMAN_MAZE[0].length;
        pacmanGraphicElement.style.width = `${cellSize}px`;
        pacmanGraphicElement.style.height = `${cellSize}px`;

        for (const n in CHARACTERS) {
            const el = CHARACTERS[n].element;
            el.style.width = `${cellSize}px`;
            el.style.height = `${cellSize}px`;
        }
    }

    updatePacmanVisualPosition();
    updateCharacterVisualPositions();
}

// ======================================================
//                INITIALIZATION
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("maze-grid");

    PACMAN_MAZE.forEach((row,r) => row.forEach((val,c) => {
        const cell = document.createElement("div");
        const type = val === PACMAN_START ? PATH : val;

        const mapping = {
            0:"wall",
            1:"path",
            2:"pellet",
            3:"power-pellet",
            4:"ghost-cage"
        };

        cell.classList.add("cell",mapping[type]);

        // Gate tile
        if (r === 12 && (c === 13 || c === 14)) {
            cell.classList.add("ghost-gate");
        }

        grid.appendChild(cell);
    }));

    // Create Pac-Man
    pacmanGraphicElement = document.createElement("div");
    pacmanGraphicElement.classList.add("pacman-graphic","pacman-right");
    grid.appendChild(pacmanGraphicElement);

    // Create ghosts
    createCharacterGraphics();

    // Input handlers
    document.addEventListener("keydown", handleKeyDown);
    handleTouchSwipe();

    resizeMaze();
    updateScoreboard();
});

window.addEventListener("resize", resizeMaze);
setTimeout(resizeMaze, 300);
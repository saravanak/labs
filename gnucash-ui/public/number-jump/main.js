const title = "NUMBER JUMP";

const description = `
[Hold] Stretch
`;

/*
 a:b :: c : ? 
 */
function proportion(a, b, c) {
  return (b * c) / a;
}

const characters = [
  ` cc   
  cc   
 crrc  
 c  c  
cc  cc 
      
`,
  `
   c   
  ccc   
  ccc   
 crrrc  
 cyyyc  
 yyyyy 
`,
];

const options = {
  isPlayingBgm: true,
  viewSize: { x: 100, y: 50 },
  isReplayEnabled: true,
  seed: 8,
};

/** @type {{angle: number, length: number, pin: Vector}} */
let cord;
/** @type {Vector[]} */
let pins;
let nextPinDist;
const cordLength = 7;

let margin = 15;
function xPosition({ direction, totalSteps, timeTakenInSeconds, createdAt }) {
  if (direction == "rtl") {
    const ticksTaken = proportion(1 / 60, 1, timeTakenInSeconds);

    const ticksForOneStep = round(
      proportion(totalSteps - (margin - 5), ticksTaken, 1)
    );

    const age = ticks - createdAt;

    let newPosition = totalSteps - round(age / ticksForOneStep);

    return newPosition;
  }
}

let jumpDirection = null;
let playerLimits;

function reset() {
  playerLimits = {
    initial: vec(margin + 5, 45),
    jump: {},
  };
  playerLimits.jump.top = playerLimits.initial.y - 10;
}

reset();

const newNumber = () => {
  let exponent = 1;
  const digits = digitsOnNumber(score);
  if(digits == 3) {
    exponent = 2
  }
  let value = floor(rnds(1, pow(10, exponent )));
  if (value < 0 && abs(value) > 9) {
    value = floor(rnds(1, 9));
  }
  return {
    v: vec(100, value > 0 ? playerLimits.jump.top : playerLimits.initial.y),
    speed: rnd(0.1, 1.5),
    value,
    createdAt: ticks,
  };
};

function drawRuledPage() {
  color("red");
  box(vec(margin, 0), 1, 100);

  color("cyan");
  times(margin, (i) => {
    box(vec(0, (i + 1) * 10), 200, 1);
  });
  color("black");
}

function digitsOnNumber(n) {
  if (n == 0) {
    n = 0.1;
  }
  return floor(Math.log10(n));
}

function mostSignificantDigit(number) {
  return floor(number / pow(10, floor(Math.log10(number))));
}

function update() {
  if (!ticks) {
    p = vec(playerLimits.initial);
    slidingNumbers = [newNumber()];
    addScore(1000);
  }

  drawRuledPage();

  const msd = mostSignificantDigit(score);
  const playerLevel = digitsOnNumber(score);
  p.x =
    margin + 5 + msd * proportion(9 /* total numbers */, 30 /* x units */, 1);
  playerLimits.initial.y = 45 - playerLevel * 10;
  playerLimits.jump.top = playerLimits.initial.y - 10;

  const delta = 0.5;
  if (jumpDirection == "up") {
    if (p.y < playerLimits.jump.top) {
      jumpDirection = "down";
    } else {
      p.y -= delta;
    }
  } else if (jumpDirection == "down") {
    if (p.y > playerLimits.initial.y) {
      jumpDirection = null;
      p.y = playerLimits.initial.y;
    } else {
      p.y += delta;
    }
  }
  if (input.isJustPressed && jumpDirection == null) {
    jumpDirection = "up";
  }

  if (jumpDirection) {
    char(addWithCharCode("a", 1), p);
  } else {
    char("a", p);
  }

  remove(slidingNumbers, (number) => {
    const numberX = xPosition({
      direction: "rtl",
      totalSteps: number.v.x,
      timeTakenInSeconds: number.speed,
      createdAt: number.createdAt,
    });

    if (numberX < 0) {
      return true;
    }
    const digitCount = digitsOnNumber(score);

    const collision = text(`${number.value}`, vec(numberX, number.v.y), {
      color: digitsOnNumber > 1 ? "green" : "black",
    });

    if (collision.isColliding?.char?.a || collision.isColliding?.char?.b) {
      let collidingNumber = number.value;
      const shouldComputeExponent = rnds(1) < 0;
      if (collidingNumber < 0) {
        const exponentMultiplier = shouldComputeExponent
          ? pow(10, playerLevel - 1)
          : 1;
        collidingNumber = collidingNumber * exponentMultiplier;
        if (abs(collidingNumber) > score) {
          collidingNumber = (score / 2) * -1;
        }
      }
      addScore(collidingNumber, vec(p).add(vec({ x: 5, y: 0 })));
      return true;
    }
    return false;
  });

  if (slidingNumbers.length == 0) {
    slidingNumbers.push(newNumber());
  }
}


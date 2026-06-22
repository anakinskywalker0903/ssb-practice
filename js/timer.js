/**
 * SSB WAT Simulator — Timer Module
 * Manages the countdown interval, fires callbacks on each tick and on expiry.
 */

class WATTimer {
  constructor({ onTick, onExpire }) {
    this.onTick = onTick;
    this.onExpire = onExpire;
    this.intervalId = null;
    this.remaining = 0;
    this.total = 0;
    this.isRunning = false;
  }

  start(seconds) {
    this.stop();
    this.total = seconds;
    this.remaining = seconds;
    this.isRunning = true;

    // Fire immediately so UI shows full count
    this.onTick(this.remaining, this.total);

    this.intervalId = setInterval(() => {
      this.remaining -= 1;

      if (this.remaining <= 0) {
        this.remaining = 0;
        this.onTick(0, this.total);
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.isRunning = false;
        this.onExpire();
      } else {
        this.onTick(this.remaining, this.total);
      }
    }, 1000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
  }

  reset() {
    this.stop();
    this.remaining = 0;
    this.total = 0;
  }

  getRemaining() {
    return this.remaining;
  }

  getProgress() {
    if (this.total === 0) return 0;
    return 1 - this.remaining / this.total;
  }
}

export default WATTimer;

import Lenis from "@studio-freight/lenis"
import gsap from "gsap"
import { Observer, ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger, Observer)

interface LenisEvent {
  animate: {
    value: number
    from: number
    to: number
    lerp: number
    duration: number
    isRunning: boolean
  }
  animatedScroll: number
  dimensions: { wrapper: Window; content: HTMLElement }
  direction: 1 | -1
  options: { wrapper: Window; content: HTMLElement }
  targetScroll: number
  time: number
  velocity: number
  __isLocked: boolean
  __isScrolling: boolean
  __isSmooth: true
  __isStopped: boolean
  actualScroll: number
  className: string
  isHorizontal: boolean
  isLocked: boolean
  isScrolling: boolean
  isSmooth: boolean
  isStopped: boolean
  limit: number
  progress: number
  scroll: number
}

export default class Scroll {
  lenis: Lenis
  scrollbar: gsap.core.Timeline
  observer: Observer
  main: gsap.core.Timeline
  navbar: gsap.core.Timeline
  constructor(page: string) {
    this.create(page)
  }

  create(page: string) {
    this.lenis = new Lenis({
      // wrapper: innerWidth >= 768 ? window : window.$(".app"),
      // smoothTouch: true,
      lerp: 0,
    })

    if (page === "home") createHome()
    if (page === "watch") createWatch()
    if (page === "blog") createNoVideo()

    this.scrollbar = gsap.timeline({ paused: true }).to(".header__nav", {
      y: "91vh",
      ease: "linear",
      duration: 5,
    })

    this.main = gsap.timeline({ paused: true }).to(".header__nav", {
      y: "91vh",
      ease: "linear",
      duration: 5,
    })

    this.observer = Observer.create({
      target: ".header__nav__track",
      onDrag: this.onDrag.bind(this),
      onDragStart: (e) => e.target.classList.add("active"),
      onDragEnd: (e) => e.target.classList.remove("active"),
    })

    this.lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.lagSmoothing(0)
    requestAnimationFrame(this.raf.bind(this))

    let isPlayingNav = false
    let isReversingNav = false
    this.lenis.on("scroll", ({ direction }: LenisEvent) => {
      if (direction > 0 && innerWidth >= 768) {
        // if (isPlayingNav) return
        // isPlayingNav = true
        // gsap.delayedCall(1.5, () => {
        //   isPlayingNav = false
        // })
        this.navbar.play()
      }
      if (direction < 0 && innerWidth >= 768) {
        // if (isReversingNav) return
        // isReversingNav = true
        // gsap.delayedCall(1.5, () => {
        //   isReversingNav = false
        // })
        this.navbar.reverse()
      }
    })

    this.navbar = gsap.timeline({ paused: true }).fromTo(
      ".Nav",
      {
        y: "0rem",
        duration: 0.2,
      },
      {
        y: "-8rem",
        ease: "expo.in",
        duration: 1.75,
      }
    )
  }

  navigate(page: string) {
    this.lenis.reset()
    this.create(page)
  }

  raf(time: number) {
    this.lenis.raf(time)
    this.scrollbar.progress(this.lenis.progress)
    requestAnimationFrame(this.raf.bind(this))
  }

  onDrag(e: globalThis.Observer) {
    this.lenis.scrollTo(
      (e.y / innerHeight) * this.lenis.dimensions.scrollHeight
    )
  }
}

function createHome() {
  const mm = gsap.matchMedia()
  let tl: gsap.core.Timeline
  tl = gsap.timeline()
  mm.add("(min-width:0px)", () => {
    tl = gsap
      .timeline({
        paused: true,
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".Join",
          scrub: true,
          endTrigger: "body",
          start: "25% 100%",
          end: "100% 100%",
        },
      })
      .to(".Footer", { yPercent: -100 })

    gsap
      .timeline({
        paused: true,
        defaults: { ease: "none", duration: 1 },
        scrollTrigger: {
          scrub: true,
          end: `+=${innerHeight}`,
        },
      })
      .to(".Nav__logo, .Nav__search", { filter: "invert(0)", delay: 10 }, 0)
      .to(".Nav__links", { color: "#090908", delay: 10 }, 0)
      .to(".Nav", { backgroundColor: "#F5F5F5cc", delay: 10 }, 0)
  })
}

function createNoVideo() {
  const mm = gsap.matchMedia()
  let tl: gsap.core.Timeline
  tl = gsap.timeline()
  mm.add("(min-width:0px)", () => {
    tl = gsap
      .timeline({
        paused: true,
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".Join",
          scrub: true,
          endTrigger: "body",
          start: "25% 100%",
          end: "100% 100%",
        },
      })
      .to(".Footer", { yPercent: -100 })

    gsap
      .timeline({})
      .set(".Nav__logo, .Nav__search", { filter: "invert(0)" }, 0)
      .set(".Nav__links", { color: "#090908" }, 0)
      .set(".Nav", { backgroundColor: "#F5F5F5cc" }, 0)
  })
}

function createWatch() {
  const mm = gsap.matchMedia()
  let tl: gsap.core.Timeline
  tl = gsap.timeline()
  mm.add("(min-width:0px)", () => {
    tl = gsap
      .timeline({
        paused: true,
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".Join",
          scrub: true,
          endTrigger: "body",
          start: "25% 100%",
          end: "100% 100%",
        },
      })
      .to(".Footer", { yPercent: -100 })

    gsap
      .timeline({
        paused: true,
        defaults: { ease: "none", duration: 1 },
        scrollTrigger: {
          scrub: true,
          end: `+=${innerHeight}`,
        },
      })
      .to(".Nav", { backgroundColor: "#0c0c0fcc", delay: 10 }, 0)
  })
}

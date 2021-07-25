/**
 * Base Transition
 */
const varTransitionEnter = {
  duration: 0.56,
  ease: [0.43, 0.13, 0.23, 0.96]
};

const varTransitionExit = {
  duration: 0.36,
  ease: [0.43, 0.13, 0.23, 0.96]
};

/**
 * Wrap Enter
 */
export const varWrapEnter = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

/**
 * Wrap Exit
 */
export const varWrapExit = {
  exit: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

/**
 * Wrap Both
 */
export const varWrapBoth = {
  animate: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

/**
 * Wrap Path
 */
export const varPath = {
  initial: {
    opacity: 0,
    pathLength: 0
  },
  animate: {
    opacity: 1,
    pathLength: 1,
    transition: {
      ...varTransitionEnter
    }
  },
  exit: {
    opacity: 0,
    pathLength: 0,
    transition: {
      ...varTransitionExit
    }
  }
};

/**
 * Hover
 */
export const varHover = {
  hover: {
    scale: 1.1
  }
};

/**
 * Click
 */
export const varSmallClick = {
  hover: {
    scale: 1.04
  },
  tap: {
    scale: 0.96
  }
};

export const varMediumClick = {
  hover: {
    scale: 1.1
  },
  tap: {
    scale: 0.9
  }
};

/**
 * Fade In
 */
export const varFadeIn = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      ...varTransitionEnter
    }
  },
  exit: {
    opacity: 0,
    transition: {
      ...varTransitionEnter
    }
  }
};

/**
 * Fade In Right
 */
export const varFadeInRight = {
  initial: {
    x: 80,
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      ...varTransitionEnter
    }
  },
  exit: {
    x: 80,
    opacity: 0,
    transition: {
      ...varTransitionExit
    }
  }
};

/**
 * Fade In Left
 */
export const varFadeInLeft = {
  initial: {
    x: -80,
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      ...varTransitionEnter
    }
  },
  exit: {
    x: -80,
    opacity: 0,
    transition: {
      ...varTransitionExit
    }
  }
};

/**
 * Fade In Up
 */
export const varFadeInUp = {
  initial: {
    y: 80,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ...varTransitionEnter
    }
  },
  exit: {
    y: 80,
    opacity: 0,
    transition: {
      ...varTransitionExit
    }
  }
};

/**
 * Fade In Down
 */
export const varFadeInDown = {
  initial: {
    y: -80,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ...varTransitionEnter
    }
  },
  exit: {
    y: -80,
    opacity: 0,
    transition: {
      ...varTransitionExit
    }
  }
};

/**
 * Bounce
 */
export const varBounce = {
  initial: {
    y: 80,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 1000
    }
  },
  exit: {
    y: -80,
    opacity: 0
  }
};

/**
 * Bounce In
 */
export const varBounceIn = {
  initial: {
    scale: 1.2,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 1000
    }
  }
};

/**
 * Zoom In Out
 */
export const varZoomInOut = {
  initial: {
    scale: 0.9,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ...varTransitionEnter
    }
  },
  exit: {
    scale: 0.5,
    opacity: 0,
    transition: {
      duration: 1.5,
      ...varTransitionExit
    }
  }
};

/**
 * ScaleX
 */
export const varScaleX = {
  initial: {
    scaleX: 0,
    opacity: 0
  },
  animate: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ...varTransitionEnter
    }
  },
  exit: {
    scaleX: 0,
    opacity: 0,
    transition: {
      duration: 1.5,
      ...varTransitionExit
    }
  }
};

/**
 * ScaleY
 */
export const varScaleY = {
  initial: {
    scaleY: 0,
    opacity: 0
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ...varTransitionEnter
    }
  },
  exit: {
    scaleY: 0,
    opacity: 0,
    transition: {
      duration: 1.5,
      ...varTransitionExit
    }
  }
};

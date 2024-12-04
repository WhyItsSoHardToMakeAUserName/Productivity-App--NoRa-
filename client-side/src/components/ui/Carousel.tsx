import { User } from "@geist-ui/icons";
import { useState, useEffect } from "react";
import { useSpring, animated } from '@react-spring/web';

interface Review {
  name: string;
  review: string;
}

export default function Carousel({ reviews }: { reviews: Review[] }) {
  const [curr, setCurr] = useState(0);

  // Automatically advance to the next slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurr((prev) => (prev + 1) % reviews.length);
    }, 3000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [reviews.length]);

  // Spring for carousel sliding effect (moving to the right for each slide)
  const carouselSpringProps = useSpring({
    transform: `translateX(-${curr * 100}%)`,  // Shift slides horizontally
    config: { tension: 170, friction: 26 },
  });

  // Spring for name opacity (fading in/out with the carousel transition)
  const nameSpringProps = useSpring({
    opacity: 1, // Target opacity to 1 for visibility
    from: { opacity: 0 }, // Fade from 0 to 1
    config: { tension: 170, friction: 26 },
  });

  return (
    <div className="p-5 w-full relative">
      <div className="flex items-center">
        <User size={50} />

        {/* Animated Name with Opacity */}
        <animated.p style={nameSpringProps} className="text-2xl">
          {reviews[curr].name}
        </animated.p>
      </div>

      {/* Carousel container with sliding effect */}
      <div className="w-full overflow-hidden relative">
        <animated.div
          className="flex"
          style={carouselSpringProps}
        >
          {reviews.map((review, index) => (
            <div key={index} className="min-w-full flex justify-center items-center text-center p-5">
              <p className="text-xl italic">&quot;{review.review}&quot;</p>
            </div>
          ))}
        </animated.div>
      </div>
    </div>
  );
}

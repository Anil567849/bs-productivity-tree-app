'use client'
import Image from "next/image"
import { useEffect, useState } from "react"

type ImageState = 0 | 1 | 2 | 3 | 4 | 5 | 6;
const SECONDINTERVAL = 1000; // in milliseconds
const POMODOROINTERVAL = ((25*1000*60)/7); // we have 7 image - one pomodoro is of 25 minutes; // in milliseconds
const ENDSECOND = 59; // total second in one minute -1
const ONEPOMODORO = 25; // one pomodoro
const ENDWIN = 96; // 24 hours == 96 pomodoro

export default function App() {

  const [image, setImage] = useState<ImageState>(0);
  const [second0, setSecond0] = useState<number>(0);
  const [second1, setSecond1] = useState<number>(0);
  const [minute0, setMinute0] = useState<number>(0);
  const [minute1, setMinute1] = useState<number>(0);
  const [win, setWin] = useState<number>(0);
  const [pomodoro, setPomodoro] = useState<number>(0);

  useEffect(() => {
    if(win == ENDWIN){
      setPomodoro((p: number) => {
        return p+1;
      })
      setWin(0);
    }
  }, [win]);

  useEffect(() => {
    if((minute1*10+minute0) == ONEPOMODORO){ // one lap done
      setWin((p: number) => {
        return p+1;
      })
      setMinute0(0);
      setMinute1(0);
    }
  }, [minute0, minute1])

  useEffect(() => {
    if((second1*10+second0) == ENDSECOND){

      setMinute0((prev: number) => {
        if(prev+1 > 9){
          setMinute1((p: number) => {
            return p+1;
          })
          return 0;
        }
        return prev + 1;
      });

      setSecond0(0);
      setSecond1(0);
    }
  }, [second0, second1])
  
  useEffect(() => {
    const inter = setInterval(() => {
      setImage((prev: any) => {
        const nextImage = prev + 1;
        return (nextImage > 6) ? 0 : nextImage;
      });
    }, POMODOROINTERVAL);

    return () => {
      clearInterval(inter);
    }
  }, []);

  useEffect(() => {
    const inter = setInterval(() => {
      setSecond0((prev: number) => {
        if(prev+1 > 9){
          setSecond1((p: number) => {
            return p+1;
          })
          return 0;
        }
        return prev + 1;
      });
    }, SECONDINTERVAL);

    return () => {
      clearInterval(inter);
    }
  }, []);

  return (
    <div className="min-h-screen w-[100vw] flex justify-center items-center relative bg-[url('/bg-green.jpg')] bg-contain">

        {
          Array.from({ length: win }).map((item, ind) => {
            return <div 
                    className={`absolute inset-0 w-[50px] h-[50px]`}
                    style={{ top: `${Math.floor((ind * 52)/416) * 52}px`, left: `${(ind * 52)%416}px` }}>
                      <Image 
                      src={`/6.png`}
                      width={1000}
                      height={1000}
                      className="w-[100%] h-[100%]"
                      alt={"image"}
                    />
            </div>
          })
        }

        <div className="h-[70vh] w-[30vw">
          <Image 
          src={`/${image}.png`}
          width={1000}
          height={1000}
          className="w-[100%] h-[100%] rounded-full"
          alt={"image"}
        />
        {
          <div className="flex justify-center">
            <p className="text-3xl text-white font-bold">{minute1}{minute0}:{second1}{second0}</p>
          </div>
        }
        </div>
    </div>
  )
}
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {

    const sectionRef = useRef(null);
    const project1Ref = useRef(null);
    const project2Ref = useRef(null);
    const project3Ref = useRef(null);

    useGSAP(() => {

        const projects = [project1Ref.current, project2Ref.current, project3Ref.current];

        projects.forEach((card, index) => {
            gsap.fromTo(
                card,
                { 
                    y: 50, opacity: 0 
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.3 * (index + 1),
                    scrollTrigger: {
                        trigger: card,
                        start: 'top bottom-=100'
                    }
                }
            )
        })

        gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });
    }, [])


    return (

        <section id="projects" ref={sectionRef} className="app-showcase">
            <div className="w-full">
                <div className="showcaselayout">
                    
                    {/* LEFT */}

                    <div className="first-project-wrapper" ref={project1Ref}>
                        <div className="image-wrapper">
                            <img src="./images/TowerAscent.png" alt="TowerAscent" />
                        </div>
                        <div className="text-content">
                            <h2>An interactive and puzzling platformer game, Tower Ascent.</h2>
                            <p className="text-white-50 md:text-xl">
                                In Tower Ascent, players must navigate a series of challenging levels, solving puzzles and overcoming obstacles to reach the top of a mysterious tower.
                            </p>
                        </div>
                    </div>
                    
                    {/* RIGHT */}

                    <div className="project-list-wrapper overflow-hidden">
                        <div className="project" ref={project2Ref}>
                            <div>
                                <img src="./images/AnimeGo.png" alt="AnimeGo" />
                            </div>
                            <h2>AnimeGo - Anime Tracker App</h2>
                        </div>

                        <div className="project" ref={project3Ref}>
                            <div>
                                <img src="./images/EeveeClicker.png" alt="EeveeClicker" />
                            </div>
                            <h2>Eevee Clicker - Pokemon Clicker Game</h2>
                        </div>

                    </div>

                </div>
            </div>
        </section>
  )
}

export default ShowcaseSection
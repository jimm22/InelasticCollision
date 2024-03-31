import React, {useRef, useEffect, useState} from 'react';
import { Solver } from './solver.js';
import { Ball } from './ball.js';

const Elastic = () => {
    const canvasRef = useRef(null);
    const [simulationActive, setSimulationActive] = useState(false);
    let solver = null;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        solver = new Solver(context);

        // Mode4 setup
        solver.reset();
        solver.vector = true;
        solver.addBall([0, canvas.height / 2], [100, 0], 25, 'orange');
        solver.addBall([canvas.width / 2, canvas.height / 2], [0, 0], 20, 'blue');

        const animate = () => {
            // Update and render the solver
            solver.update(1/60); // Assuming 60 FPS
            solver.render();
            requestAnimationFrame(animate);
        };

        // Start the animation loop
        animate();

        // Cleanup on component unmount
        return () => {
            // Stop the animation or any other cleanup
        };
    }, [simulationActive]);

    const handleSimulateClick = () => {
        setSimulationActive(true);
    };

    return (
        <div className="flex flex-col mt-20 border border-white mx-40 rounded-lg">
            <div className="text-center border-b border-white space-x-20 py-5">
                <span className="font-press">YELLOW</span>
                <span className="font-press text-[30px]">VS</span>
                <span className="font-press">BLUE</span>
            </div>
            <div className="flex relative h-[240px] place-items-center bg-black pt-4 pb-5">
                <div className="flex h-full flex-grow card rounded-box place-items-center bg-white bg-opacity-10 m-20 px-5 shadow-lg font-press">
                    <div className="flex flex-col w-full lg:flex-row pt-2">
                        {/* Left car details */}
                        <div className="grid flex-grow card rounded-box place-items-left">
                            <span className="text-a2 text-[20px]">9BALL</span>
                            <span>MASS: 12</span>
                            <span>VELOCITY: 12</span>
                            <span>MOMENTUM: 12</span>
                        </div>

                        {/* Right car details */}
                        <div className="grid flex-grow card rounded-box place-items-center">
                            <div className="grid flex-grow card rounded-box place-items-left">
                                <span className="text-a2 text-[20px]">8BALL</span>
                                <span>MASS: 12</span>
                                <span>VELOCITY: 221</span>
                                <span>MOMENTUM: 3213</span>
                            </div>
                        </div>
                    </div>
                    <div className="divider bg-white bg-opacity-50 h-[3px] rounded"></div>
                    <button
                        onClick={handleSimulateClick}
                        className="btn btn-block font-press bg-a2 border border-a2 text-white tracking-[5px] font-size text-[16px]"
                    >
                        SIMULATE
                    </button>
                </div>
                <div className="divider divider-horizontal bg-white bg-opacity-50 w-[3px] rounded"></div>
                <div className="grid h-full flex-grow card rounded-box place-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
            </div>
            <div className="flex justify-center">
                <canvas className="w-full h-full" ref={canvasRef} width={window.innerWidth}/>
            </div>
        </div>
    );
};

export default Elastic;
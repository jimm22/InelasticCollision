import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import lambo1 from './InelasticAssets/lambo.png';
import lambo2 from './InelasticAssets/invertedlambo.png';
import lambo3 from './InelasticAssets/lambo1.png';
import lambo4 from './InelasticAssets/invertedlambo1.png';
import motor1 from './InelasticAssets/motor.png';
import motor2 from './InelasticAssets/invertedmotor.png';
import motor3 from './InelasticAssets/brokenmotor.png';
import motor4 from './InelasticAssets/invertedbrokenmotor.png';
import truck1 from './InelasticAssets/truck.png';
import truck2 from './InelasticAssets/invertedtruck.png';
import truck3 from './InelasticAssets/truck1.png';
import truck4 from './InelasticAssets/invertedtruck1.png';
import retry from './InelasticAssets/retry.png';

function Inelastic() {
    const canvasContainerRef = useRef(null);
    const leftcarsradio = ['Lamborghini', 'Motorcycle', 'Truck'];
    const rightcarsradio = ['Lamborghini', 'Motorcycle', 'Truck'];
    const [collisionOccurred, setCollisionOccurred] = useState(false);
    const [retryClicked, setRetryClicked] = useState(false);

    const [selectedleftcarRadio, setSelectedleftcarRadio] = useState(0);
    const [selectedrightcarRadio, setSelectedrightcarRadio] = useState(0);
    const [leftCarDetails, setLeftCarDetails] = useState({
        name: '',
        mass: '',
        velocity: '',
        momentum: ''
    });
    const [rightCarDetails, setRightCarDetails] = useState({
        name: '',
        mass: '',
        velocity: '',
        momentum: ''
    });
    let engine;
    let render;
    let truckcar, invtruckcar, motorcar, invmotorcar, lambocar, invlambocar, newcar, scooter;
    useEffect(() => {
        if (canvasContainerRef.current) {
            engine = Matter.Engine.create();
            render = Matter.Render.create({
                element: canvasContainerRef.current,
                engine: engine,
                options: {
                    width: 1500,
                    height: 400,
                    wireframes: false,
                    background: '#1c1c1c',

                },
            });
            canvasContainerRef.current.style.border = '0px solid green';
            canvasContainerRef.current.style.overflow = 'hidden';

            const ground = Matter.Bodies.rectangle(457, 222, 1798, 60, {
                isStatic: true,
                render: {
                    fillStyle: '#c0c0c0',
                },
            });

            const ground2 = Matter.Bodies.rectangle(457, 190, 1798, 10, {
                isStatic: true,
                render: {
                    fillStyle: '#fff',
                },
            });

            Matter.World.add(engine.world, [ground, ground2]);

            truckcar = Matter.Bodies.rectangle(355, 50, 317, 85, {
                isStatic: false,

                render: {
                    sprite: {
                        texture: truck1,
                        xScale: 1,
                        yScale: 1
                    }
                }
            });

            scooter = Matter.Bodies.rectangle(355, 50, 127, 35, {
                isStatic: false,
                restitution: 1,
                render: {
                    sprite: {
                        texture: motor1,
                        xScale: 1,
                        yScale: 1

                    }
                }
            });

            newcar = Matter.Bodies.rectangle(355, 50, 260, 30, {
                isStatic: false,
                render: {
                    sprite: {
                        texture: lambo1,
                        xScale: 1,
                        yScale: 1
                    }
                }
            });

            invtruckcar = Matter.Bodies.rectangle(1005, 50, 317, 85, {
                isStatic: false,

                render: {
                    sprite: {
                        texture: truck2,
                        xScale: 1,
                        yScale: 1
                    }
                }
            });
            //motorcar not included
            motorcar = Matter.Bodies.rectangle(355, 50, 127, 35, {
                isStatic: false,

                render: {
                    sprite: {
                        texture: motor1,
                        xScale: 1,
                        yScale: 1
                    }
                }
            });

            invmotorcar = Matter.Bodies.rectangle(1005, 50, 127, 35, {
                isStatic: false,
                restitution: 1,
                render: {
                    sprite: {
                        texture: motor2,
                        xScale: 1,
                        yScale: 1
                    }
                }
            });
            //lambocar not included
            lambocar = Matter.Bodies.rectangle(355, 50, 260, 30, {
                isStatic: false,

                render: {
                    sprite: {
                        texture: lambo1,
                        xScale: 1,
                        yScale: 1
                    }
                }
            });

            invlambocar = Matter.Bodies.rectangle(1005, 50, 260, 30, {
                isStatic: false,

                render: {
                    sprite: {
                        texture: lambo2,
                        xScale: 1,
                        yScale: 1
                    }
                }
            });

            const updateCars = () => {
                Matter.World.remove(engine.world, [truckcar, invtruckcar, motorcar, invmotorcar, newcar, invlambocar, scooter]);

                let leftCar;
                switch (selectedleftcarRadio) {
                    case 0:
                        leftCar = newcar;
                        break;
                    case 1:
                        leftCar = scooter;
                        break;
                    case 2:
                        leftCar = truckcar;
                        break;
                    default:
                        leftCar = null;
                }

                let rightCar;
                switch (selectedrightcarRadio) {
                    case 0:
                        rightCar = invlambocar;
                        break;
                    case 1:
                        rightCar = invmotorcar;
                        break;
                    case 2:
                        rightCar = invtruckcar;
                        break;
                    default:
                        rightCar = null;
                }

                const carsToAdd = [];
                if (leftCar) carsToAdd.push(leftCar);
                if (rightCar) carsToAdd.push(rightCar);
                Matter.World.add(engine.world, carsToAdd);
            };

            updateCars();

            Matter.Engine.run(engine);
            Matter.Render.run(render);

            return () => {
                Matter.Render.stop(render);
                Matter.Engine.clear(engine);
                render.canvas.remove();
            };
        }
    }, [selectedleftcarRadio, selectedrightcarRadio]);

    const handleSimulateClick = () => {
        if (!collisionOccurred) {
            let leftCarInterval, rightCarInterval;
            switch (selectedleftcarRadio) {
                case 0:
                    leftCarInterval = setInterval(() => {
                        Matter.Body.applyForce(newcar, newcar.position, { x: 0.1, y: 0 });
                    }, 100);
                    break;
                case 1:
                    leftCarInterval = setInterval(() => {
                        Matter.Body.applyForce(scooter, scooter.position, { x: 0.06, y: 0 });
                    }, 100);
                    break;
                case 2:
                    leftCarInterval = setInterval(() => {
                        Matter.Body.applyForce(truckcar, truckcar.position, { x: 0.3, y: 0 });
                    }, 100);
                    break;
                default:
                    break;
            }

            switch (selectedrightcarRadio) {
                case 0:
                    rightCarInterval = setInterval(() => {
                        Matter.Body.applyForce(invlambocar, invlambocar.position, { x: -0.1, y: 0 });
                    }, 100);
                    break;
                case 1:
                    rightCarInterval = setInterval(() => {
                        Matter.Body.applyForce(invmotorcar, invmotorcar.position, { x: -0.06, y: 0 });
                    }, 100);
                    break;
                case 2:
                    rightCarInterval = setInterval(() => {
                        Matter.Body.applyForce(invtruckcar, invtruckcar.position, { x: -0.3, y: 0 });
                    }, 100);
                    break;
                default:
                    break;
            }

            Matter.Events.on(engine, 'collisionStart', (event) => {
                const pairs = event.pairs;
                for (let i = 0; i < pairs.length; i++) {
                    const pair = pairs[i];
                    if ((pair.bodyA === truckcar && pair.bodyB === invtruckcar) ||
                        (pair.bodyA === truckcar && pair.bodyB === invlambocar) ||
                        (pair.bodyA === truckcar && pair.bodyB === invmotorcar) ||
                        (pair.bodyA === scooter && pair.bodyB === invmotorcar) ||
                        (pair.bodyA === scooter && pair.bodyB === invlambocar) ||
                        (pair.bodyA === scooter && pair.bodyB === invtruckcar) ||
                        (pair.bodyA === newcar && pair.bodyB === invlambocar) ||
                        (pair.bodyA === newcar && pair.bodyB === invmotorcar) ||
                        (pair.bodyA === newcar && pair.bodyB === invtruckcar)) {

                        if (pair.bodyA == newcar) {
                            newcar.render.sprite.texture = lambo3;
                        } else if (pair.bodyA == scooter) {
                            scooter.render.sprite.texture = motor3;
                        } else if (pair.bodyA == truckcar) {
                            truckcar.render.sprite.texture = truck3;
                        }

                        if (pair.bodyB == invlambocar) {
                            invlambocar.render.sprite.texture = lambo4;
                        } else if (pair.bodyB == invmotorcar) {
                            invmotorcar.render.sprite.texture = motor4;
                        } else if (pair.bodyB == invtruckcar) {
                            invtruckcar.render.sprite.texture = truck4;
                        }

                        setTimeout(() => {
                            Matter.Body.setStatic(pair.bodyA, true);
                            Matter.Body.setStatic(pair.bodyB, true);
                        }, 500);

                        setCollisionOccurred(true);
                        break;
                    }
                }
            });
        }
    };

    const handleRetryClick = () => {
        setRetryClicked(true);
        setCollisionOccurred(false);
        setSelectedleftcarRadio(0);
        setSelectedrightcarRadio(0);
        setLeftCarDetails({
            name: 'Lambo',
            mass: '500kg',
            velocity: '80m/s',
            momentum: '40000kg m/s'
        });
        setRightCarDetails({
            name: 'Lambo',
            mass: '500kg',
            velocity: '80m/s',
            momentum: '40000kg m/s'
        });
        Matter.World.remove(engine.world, [truckcar, invtruckcar, motorcar, invmotorcar, newcar, invlambocar, scooter]);

    };

    return (
        <div className="flex flex-col w-full mt-20 ">
            <div className="flex h-20 rounded-tl-lg rounded-tr-lg rounded-bl-none rounded-br-none place-items-center ml-20 mr-20 mt-10 bg-black border border-white">
                {leftcarsradio.map((car, index) => (
                    <div className="form-control" key={index}>
                        <label className="label cursor-pointer">
                            <span className="label-text text-white">{car}</span>
                            <input
                                type="radio"
                                name="leftcars"
                                className="radio checked:bg-white-500"
                                checked={index === selectedleftcarRadio}
                                onChange={() => {
                                    setSelectedleftcarRadio(index);
                                    switch (index) {
                                        case 0:
                                            setLeftCarDetails({
                                                name: 'Lambo',
                                                mass: '50kg',
                                                velocity: '80m/s',
                                                momentum: '40000kg m/s'
                                            });
                                            break;
                                        case 1:
                                            setLeftCarDetails({
                                                name: 'Motorcycle',
                                                mass: '10kg',
                                                velocity: '40m/s',
                                                momentum: '7200kg m/s'
                                            });
                                            break;
                                        case 2:
                                            setLeftCarDetails({
                                                name: 'Truck',
                                                mass: '800kg',
                                                velocity: '60m/s',
                                                momentum: '48000kg m/s'
                                            });
                                            break;
                                        default:
                                            setLeftCarDetails({
                                                name: '',
                                                mass: '',
                                                velocity: '',
                                                momentum: ''
                                            });
                                            break;
                                    }
                                }}
                            />
                        </label>
                    </div>
                ))}
                <span className="p-20">VS</span>
                {rightcarsradio.map((car, index) => (
                    <div className="form-control" key={index}>
                        <label className="label cursor-pointer">
                            <span className="label-text text-white">{car}</span>
                            <input
                                type="radio"
                                name="rightcars"
                                className="radio checked:bg-white-500"
                                checked={index === selectedrightcarRadio}
                                onChange={() => {
                                    setSelectedrightcarRadio(index);
                                    switch (index) {
                                        case 0:
                                            setRightCarDetails({
                                                name: 'Lambo',
                                                mass: '500kg',
                                                velocity: '80m/s',
                                                momentum: '40000kg m/s'
                                            });
                                            break;
                                        case 1:
                                            setRightCarDetails({
                                                name: 'Motorcycle',
                                                mass: '180kg',
                                                velocity: '40m/s',
                                                momentum: '7200kg m/s'
                                            });
                                            break;
                                        case 2:
                                            setRightCarDetails({
                                                name: 'Truck',
                                                mass: '800kg',
                                                velocity: '60m/s',
                                                momentum: '48000kg m/s'
                                            });
                                            break;
                                        default:
                                            setRightCarDetails({
                                                name: 'None',
                                                mass: 'None',
                                                velocity: 'None',
                                                momentum: 'None'
                                            });
                                            break;
                                    }
                                }}
                            />
                        </label>
                    </div>
                ))}
            </div>

            <div className="flex relative h-[240px] place-items-center ml-20 mr-20 bg-black border border-white pt-10 pb-5">
                <div className="flex h-full flex-grow card rounded-box place-items-center bg-white bg-opacity-10 m-20 px-5 shadow-lg font-press">
                    <div className="flex flex-col w-full lg:flex-row pt-2">
                        <div className="grid flex-grow card rounded-box place-items-left">
                            <span className="text-a2 text-[20px]">{leftCarDetails.name}</span>
                            <span>MASS: {leftCarDetails.mass}</span>
                            <span>VELOCITY: {leftCarDetails.velocity}</span>
                            <span>MOMENTUM: {leftCarDetails.momentum}</span>
                        </div>
                        <div className="grid flex-grow card rounded-box place-items-center">
                            <div className="grid flex-grow card rounded-box place-items-left">
                                <span className="text-a2 text-[20px]">{rightCarDetails.name}</span>
                                <span>MASS: {rightCarDetails.mass}</span>
                                <span>VELOCITY: {rightCarDetails.velocity}</span>
                                <span>MOMENTUM: {rightCarDetails.momentum}</span>
                            </div>
                        </div>
                    </div>
                    <div className="divider bg-white bg-opacity-50 h-[3px] rounded"></div>
                    {collisionOccurred ? (
                        <button
                            onClick={handleRetryClick}
                            className="btn btn-block font-press bg-a2 border border-a2 text-white tracking-[5px] font-size text-[16px]"
                        >
                            RETRY
                        </button>
                    ) : (
                        <button
                            onClick={handleSimulateClick}
                            className="btn btn-block font-press bg-a2 border border-a2 text-white tracking-[5px] font-size text-[16px]"
                        >
                            SIMULATE
                        </button>
                    )}
                </div>
                <div className="divider divider-horizontal bg-white bg-opacity-50 w-[3px] rounded"></div>
                <div className="grid h-full flex-grow card rounded-box place-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
            </div>
            <div ref={canvasContainerRef} className="grid h-64 card rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg place-items-center ml-20 mr-20 bg-black border border-white"></div>
        </div>
    );
}

export default Inelastic;

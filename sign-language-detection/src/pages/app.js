import React, {useState, useEffect, useRef} from 'react'
import Webcam from 'react-webcam';

import * as handpose from '@tensorflow-models/handpose'
import {drawHand} from '../components/handposeutil'
import * as fp from 'fingerpose'

import Handsigns from '../handsigns'

import {
    Container,
    Box,
    Text,
    Heading,
    Button,
    Image,
    Stack,
    ChakraProvider
} from '@chakra-ui/react'

import {Signimage} from '../handimage';

import Alphabet from '../components/alphabet'

import '../styles/App.css'

import '@tensorflow/tfjs-backend-webgl';

import {RiStopCircleFill} from "react-icons/ri";

export default function App() {

    let state = 'started';
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const [cameraState,
        setCameraState] = useState("on");

    const [sign, setSign] = useState(null);
    
    async function loadHandpose() {
        const net = await handpose.load();
        
        setInterval(() => {
            detectHandPose(net);
        }, 100);
    };

    async function detectHandPose(net) {
        if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;
            
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            const hand = await net.estimateHands(video);

            if (hand.length > 0) {
                const GE = new fp.GestureEstimator([
                    fp.Gestures.ThumbsUpGesture,
                    Handsigns.aSign, Handsigns.bSign, Handsigns.cSign, Handsigns.dSign, Handsigns.eSign, Handsigns.fSign, Handsigns.gSign,
                    Handsigns.hSign, Handsigns.iSign, Handsigns.jSign, Handsigns.kSign, Handsigns.lSign, Handsigns.mSign, Handsigns.nSign,
                    Handsigns.oSign, Handsigns.pSign, Handsigns.qSign, Handsigns.rSign, Handsigns.sSign, Handsigns.tSign, Handsigns.uSign,
                    Handsigns.vSign, Handsigns.wSign, Handsigns.xSign, Handsigns.ySign, Handsigns.zSign
                ]);

                const estimatedGestures = await GE.estimate(hand[0].landmarks, 6.5);

                if (state === 'started') {
                    document
                        .querySelector('#app-title')
                        .innerText = "Đưa ra ký hiệu 👍 để bắt đầu";
                }

                if (estimatedGestures.gestures !== undefined && estimatedGestures.gestures.length > 0) {
                    const confidence = estimatedGestures
                        .gestures
                        .map((p) => p.confidence);
                    const maxConfidence = confidence.indexOf(Math.max.apply(undefined, confidence));

                    if (estimatedGestures.gestures[maxConfidence].name === 'thumbs_up' && state !== 'played') {
                        state = 'played';
                    } else if (state === 'played') {
                        document
                            .querySelector('#app-title')
                            .innerText = "";
                        
                        setSign(estimatedGestures.gestures[maxConfidence].name);
                        
                    } else if (state === 'finished') {
                        return;
                    }
                }

            }
            const ctx = canvasRef.current.getContext("2d");
            drawHand(hand, ctx);
        }
    };

    useEffect(() => {
        loadHandpose();
    },[]);

    function endCommunicate() {
        if (cameraState === "on") {
            window.close();
        } else {
            setCameraState('on');
        }
    }

    return (
        <ChakraProvider>
            <Box bgColor="#6b93bb">
            <Container centerContent maxW="xl" height="100vh" pt="0" pb="0">
                <Box style={{paddingTop: 100}}/>
                <Heading as="h1" size="lg" id="app-title" color="white" textAlign="center">Vui lòng đợi trong giây lát...️</Heading>
                <Box id="container">
                    {cameraState === 'on' && <Webcam id="webcam" ref={webcamRef}/>}
                    {sign
                        ? (<div style={{
                            position: "absolute",
                            marginLeft: "auto",
                            marginRight: "auto",
                            left: 100,
                            top: 100,
                            padding: "20px",
                            textAlign: "-webkit-center",}}>
                            <Text color="white" fontSize="xl">Ký hiệu được phát hiện</Text>
                            {Signimage[sign] ?
                              <img alt="signImage"
                                   src={Signimage[sign]}
                                   style={{
                                       paddingTop: 30,
                                       height: 120
                                   }}
                              /> : <></>
                            }
                        </div>
                        )
                        : (" ")}
                </Box>

                <canvas id="canvas" ref={canvasRef} style={{}}/>

                <Box
                    id="singmoji"
                    style={{
                    zIndex: 9,
                    position: 'fixed',
                    top: '50px',
                    right: '30px'
                }}></Box>

                <Image h="150px" objectFit="cover" id='emoji-img'/>

            </Container>
            <Stack id="buttons" spacing={4} direction="row" align="center">
                <Button leftIcon={<RiStopCircleFill size={20}/>} onClick={endCommunicate} color="blue.500">Kết thúc</Button>
                <Alphabet />
            </Stack>
            </Box>
        </ChakraProvider>
    )
}



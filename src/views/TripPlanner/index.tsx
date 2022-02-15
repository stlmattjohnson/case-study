import React, { useEffect, useContext, KeyboardEvent } from "react";
import { RouteParams } from "../../bin/RouteParams";
import { Center, Flex, useBreakpointValue } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import RouteList from "../../components/RouteList";
import DirectionList from "../../components/DirectionList";
import StopList from "../../components/StopList";
import NexTripResults from "../../components/NexTripResults";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { TripContext } from "../../pages/Home";

const TripPlanner = () => {
  const { routeId, directionId, placeCode } = useParams<RouteParams>();
  const stepperSize = useBreakpointValue({ base: "sm", md: "md" });

  const {
    route,
    setRoute,
    routeDetails,
    setRouteDetails,
    direction,
    setDirection,
    directionDetails,
    setDirectionDetails,
    stop,
    setStop,
    stopDetails,
    setStopDetails,
  } = useContext(TripContext);

  const { activeStep, setStep } = useSteps({
    initialStep: 0,
  });

  useEffect(() => {
    if (routeId && directionId && placeCode) {
      setStep(3);
    } else if (routeId && directionId) {
      resetStop();
      setStep(2);
    } else if (routeId) {
      resetStop();
      resetDirection();
      setStep(1);
    } else {
      resetStop();
      resetDirection();
      resetRoute();
      setStep(0);
    }
  }, [routeId, directionId, placeCode]);

  const resetRoute = () => {
    if (route) {
      setRoute(undefined);
      setRouteDetails(undefined);
    }
  };
  const resetDirection = () => {
    if (direction) {
      setDirection(undefined);
      setDirectionDetails(undefined);
    }
  };
  const resetStop = () => {
    if (stop) {
      setStop(undefined);
      setStopDetails(undefined);
    }
  };

  const stepClickHandler = (step: number) => {
    switch (step) {
      case 0:
        setStep(step);
        break;
      case 1:
        if (routeId) setStep(step);
        break;
      case 2:
        if (routeId && directionId) setStep(step);
        break;
      case 3:
        if (routeId && directionId && placeCode) setStep(step);
        break;
      default:
        break;
    }
  };

  const stepKeyHandler = (e: KeyboardEvent<HTMLDivElement>, step: number) => {
    if (e.key === "Enter") {
      stepClickHandler(step);
    }
  };

  return (
    <Center mb={8} data-testid="trip-planner-box">
      <Flex w={["95%", "90%", "85%"]} flexDir="column">
        <Steps
          colorScheme="telegram"
          size={stepperSize}
          activeStep={activeStep}
          onClickStep={(step) => stepClickHandler(step)}
        >
          <Step
            role="button"
            onKeyDown={(e) => stepKeyHandler(e, 0)}
            aria-label={"View Routes"}
            tabIndex={0}
            label="Route"
            description={routeDetails}
            data-testid="route-step-clickable"
          >
            <RouteList />
          </Step>
          <Step
            role="button"
            onKeyDown={(e) => stepKeyHandler(e, 1)}
            aria-label="View Directions if Route Selected"
            tabIndex={0}
            label="Direction"
            description={directionDetails}
            data-testid="direction-step-clickable"
          >
            {routeId && <DirectionList routeId={routeId} />}
          </Step>
          <Step
            role="button"
            onKeyDown={(e) => stepKeyHandler(e, 2)}
            aria-label="View Stops if Route and Direction Selected"
            tabIndex={0}
            label="Stop"
            description={stopDetails}
            data-testid="stop-step-clickable"
          >
            {routeId && directionId && (
              <StopList routeId={routeId} directionId={directionId} />
            )}
          </Step>
          <Step
            role="button"
            onKeyDown={(e) => stepKeyHandler(e, 3)}
            aria-label="View Departure Results"
            tabIndex={0}
            label="Departures"
            data-testid="nextripresult-step-clickable"
          >
            {routeId && directionId && placeCode && (
              <NexTripResults
                routeId={routeId}
                directionId={directionId}
                placeCode={placeCode}
              />
            )}
          </Step>
        </Steps>
      </Flex>
    </Center>
  );
};

export default TripPlanner;

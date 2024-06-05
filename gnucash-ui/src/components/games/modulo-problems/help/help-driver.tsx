// import { Button, Card, Group, Stepper, Text } from "@mantine/core";
// import { useLocalStorage } from "@mantine/hooks";
// import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons";
// import { useEffect } from "react";

// export default function CheckerRowHelp({
//   name,
//   slides,
//   onActiveSlideChanged,
//   navigationDisabled,
//   showFinish,
//   onClose,
// }) {
//   const [active, setActive] = useLocalStorage({
//     key: `${name}.helper.activeSlide`,
//     defaultValue: 0,
//   });
//   const nextStep = () => {
//     setActive((current) => {
//       const newActiveSlide = (current + 1) % slides.length;
//       return newActiveSlide;
//     });
//   };
//   const prevStep = () => {
//     setActive((current) => {
//       const newActiveSlide = current == 0 ? slides.length - 1 : current - 1;
//       return newActiveSlide;
//     });
//   };

//   const isLastStep = active == slides.length - 1;
//   useEffect(() => {
//     if (slides[active]?.checkCurrentCell) {
//       onActiveSlideChanged(slides[active]);
//     }
//   }, [active]);
//   return (
//     <Card shadow="sm" p="lg" radius="md" m="lg" withBorder>
//       <Stepper
//         active={active}
//         onStepClick={setActive}
//         size="xs"
//         styles={{
//           steps: { display: "none" },
//         }}
//       >
//         {slides.map((s, index) => {
//           return (
//             <Stepper.Step
//               allowStepClick={false}
//               key={"s" + index}
//               label={s.title}
//             >
//               {s.content}
//             </Stepper.Step>
//           );
//         })}
//       </Stepper>
//       <Group position="center" mt="xl">
//         {isLastStep && showFinish ? (
//           <Button variant="default" onClick={onClose}>
//             Done
//           </Button>
//         ) : (
//           <>
//             <Button
//               variant="default"
//               onClick={prevStep}
//               disabled={navigationDisabled}
//             >
//               <IconArrowNarrowLeft />
//             </Button>
//             <Button
//               variant="default"
//               onClick={nextStep}
//               disabled={navigationDisabled}
//             >
//               <IconArrowNarrowRight />
//             </Button>
//           </>
//         )}
//       </Group>
//     </Card>
//   );
// }

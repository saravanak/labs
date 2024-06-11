import ArtCanvas from "@/components/math-art/art-canvas";

async function getData() {
  const res: any = await fetch("http://localhost:3001/script", {
    method: "POST",
    body: `
export function logic(x,y) {
  return x == 3 ? "blue" : "black" ;
};
`,
  });

  return res.json();
}

export default async function MathArtPage() {
  const data = await getData();
  return <ArtCanvas data={data} />;
}


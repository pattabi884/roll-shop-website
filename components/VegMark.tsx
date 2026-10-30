// Indian veg / non-veg indicator: green dot for veg, red triangle for non-veg.
export default function VegMark({ veg }: { veg: boolean }) {
  return (
    <span
      title={veg ? "Veg" : "Non-veg"}
      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border-2 ${veg ? "border-leaf" : "border-chili"}`}
    >
      {veg ? (
        <span className="h-2 w-2 rounded-full bg-leaf" />
      ) : (
        <span className="h-0 w-0 border-x-[4px] border-b-[7px] border-x-transparent border-b-chili" />
      )}
      <span className="sr-only">{veg ? "Veg" : "Non-veg"}</span>
    </span>
  );
}

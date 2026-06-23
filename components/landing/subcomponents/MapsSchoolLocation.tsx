const MapsSchoolLocation = () => {
  return (
    <iframe
      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_MAPS_EMBED_API_KEY}&q=Suankularb+Wittayalai+School,Bangkok&zoom=15`}
      className="border-primary-border h-full w-full rounded-lg border bg-white"
      height={400}
    />
  );
};

export default MapsSchoolLocation;

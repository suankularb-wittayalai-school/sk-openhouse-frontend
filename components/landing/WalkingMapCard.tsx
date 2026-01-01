const WalkingMapCard = () => {
  return (
    <iframe
      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_MAPS_EMBED_API_KEY}&q=Suankularb+Wittayalai+School,Bangkok`}
      className="border-primary-border rounded-lg border"
      height={250}
    />
  );
};

export default WalkingMapCard;

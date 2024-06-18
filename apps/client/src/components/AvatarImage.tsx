interface CustomImageProps {
  src: string;
  alt: string;
  className?: string;
}

const AvatarImage = (props: CustomImageProps) => {
  const { src, alt, className } = props;
  return (
    <div className={className}>
      <img
        className="w-full h-full object-cover rounded-full shadow shadow-lg"
        src={src}
        alt={alt}
        onError={(e) => {
          e.currentTarget.src = `https://ui-avatars.com/api/?name=${alt}`;
        }}
      />
    </div>
  );
};

export default AvatarImage;

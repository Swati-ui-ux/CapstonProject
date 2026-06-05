const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      <span>{text}</span>
    </div>
  );
};

export default Loader;
const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
        <span
          className="w-2 h-2 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0.15s" }}
        ></span>
        <span
          className="w-2 h-2 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></span>
      </div>

      <span className="text-sm font-medium">
        {text}
      </span>
    </div>
  );
};

export default Loader;
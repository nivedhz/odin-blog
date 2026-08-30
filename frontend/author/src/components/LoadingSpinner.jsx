import { PuffLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function LoadingSpinner({ loading }) {
  return (
    <div className="min-h-180 flex justify-center items-center dark bg-background">
      <PuffLoader
        color="#ffffff70"
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default LoadingSpinner;

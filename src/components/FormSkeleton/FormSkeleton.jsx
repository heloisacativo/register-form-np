import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const FormSkeleton = ({
  baseColor = "#202020",
  highlightColor = "#444",
  sections = 3,
  fieldsPerSection = 2,
  fieldHeight = "40px", 
  fieldWidth = "100%", 
  buttonCount = 2, 
  buttonWidth = "150px",
  buttonHeight = "45px", 
  extraFields = [],
}) => {
    return (
        <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
        <div className="bg-background flex justify-center items-center w-full h-screen px-5 md:px-20">
        <div className="flex flex-col items-center justify-center w-full max-w-3xl">
        <div className="h-screen w-96 flex flex-col justify-center">
        <div className="flex flex-col mb-5 pt-3">
        <Skeleton circle width={40} height={40} className="mb-3" />
        <Skeleton width="60%" height={20} />
      </div>

      {[...Array(sections)].map((_, sectionIndex) => (
        <div key={sectionIndex} className="flex gap-3 justify-between mb-4">
          {[...Array(fieldsPerSection)].map((_, fieldIndex) => (
            <div key={fieldIndex} className="flex-1">
              <Skeleton height={fieldHeight} width={fieldWidth} />
            </div>
          ))}
        </div>
      ))}

      {extraFields.map((field, index) => (
        <div key={index} className="mb-4">
          <Skeleton height={field.height} width={field.width} />
        </div>
      ))}

      <div className="flex flex-wrap gap-3 justify-end mt-4">
        {[...Array(buttonCount)].map((_, buttonIndex) => (
          <Skeleton
            key={buttonIndex}
            height={buttonHeight}
            width={buttonWidth}
          />
        ))}
      </div>
    </div>
  </div>
</div>
    </SkeletonTheme>
  );
};

export default FormSkeleton;
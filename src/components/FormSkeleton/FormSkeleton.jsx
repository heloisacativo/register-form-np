
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
      <div className="w-full max-w-xl mx-auto">
        {/* Cabeçalho */}
        <div className="flex flex-col justify-start mb-5">
          <Skeleton circle width={40} height={40} className="mb-3" />
          <Skeleton width="60%" height={20} />
        </div>

        {/* Campos do formulário */}
        {[...Array(sections)].map((_, sectionIndex) => (
          <div key={sectionIndex} className="flex gap-3 justify-between mb-4">
            {[...Array(fieldsPerSection)].map((_, fieldIndex) => (
              <div key={fieldIndex} className="flex-1">
                <Skeleton height={fieldHeight} width={fieldWidth} />
              </div>
            ))}
          </div>
        ))}

        {/* Extra fields */}
        {extraFields.map((field, index) => (
          <div key={index} className="mb-4">
            <Skeleton height={field.height} width={field.width} />
          </div>
        ))}

        {/* Botões */}
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
    </SkeletonTheme>
  );
};

export default FormSkeleton;
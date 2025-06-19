import './SubHeader.css';

type Props = {
  subHeaders: Array<string>;
};

export function SubHeader(props: Props) {
  const subHeaders: Array<string> = props.subHeaders;
  return (
    <>
      <div className="resultsHeader">
        {subHeaders.map((subHeader: string, index: number) => (
          <span className="headers" key={index}>
            {subHeader}
          </span>
        ))}
      </div>
      <hr />
    </>
  );
}

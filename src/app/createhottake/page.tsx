import "./CreateHotTake.css"

function HotTakes({
                     hotTakeId,
                   }: {
  hotTakeId: string;
}) {
  console.log(hotTakeId);
  return (
      <div className="hot-container">
          <div className="hot-header">
            <h2>Hot Takes</h2>
            <div>submit your hot take here</div>
          </div>
        <div className={"hot-body"}>
          <label>hot take<input></input></label>
          <label>name<input></input></label>
          <button>submit</button>
        </div>

      </div>
  );
}

export default HotTakes;

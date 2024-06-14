export default function GameJoiner({ gameState, joinAsAplayer }:any) {
    const { isGameJoined, yourStatus, serverMessage } = gameState;
  
    let component = null;
  
    if (yourStatus == "not_joined") {
      component = <button onClick={() => joinAsAplayer()}> Join Game </button>;
    } else {
      component = <b> You can&apos;t join the game now</b>;
    }
  
    return (
      <>
        <p> {serverMessage}</p>
        {component}
      </>
    );
  }
import { useConferencesState } from './Context';

export default function Conferences() {
  const [state, updateState] = useConferencesState();
  console.log('Render Games/Conferences', state);
  return (
    <div>
      <h1>Conferences</h1>
      <hr />
      <div>
        <div style={{ cursor: 'default' }}>
          State:{' '}
          <div>
            <code>
              <pre>{JSON.stringify(state, null, 2)}</pre>
            </code>
          </div>
        </div>
        <div>
          <span>Will add a new entry and keep updating on change: </span>
          <input
            onChange={({ target }) =>
              updateState<{ input: string }>((d) => {
                d.input = target.value;
              })
            }
          />
        </div>
        <div>
          <span>On click should re-render only once: </span>
          <button
            onClick={() => {
              updateState<{ isClicked: boolean }>((s) => {
                s.isClicked = true;
              });
            }}
          >
            Set Check
          </button>
        </div>
      </div>
    </div>
  );
}

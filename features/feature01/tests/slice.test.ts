import { createFeature01Slice } from '../slice';

describe('Feature01Slice', () => {
  it('should initialize with default state', () => {
    const set = jest.fn();
    const get = jest.fn();
    const api = {} as any;
    
    const slice = createFeature01Slice(set, get, api);
    
    expect(slice.featureState).toEqual({
      state1: 'state1',
      state2: 2,
    });
  });

  it('should update state1', () => {
    let state = {
      featureState: {
        state1: 'state1',
        state2: 2,
      }
    };
    
    const set = jest.fn((fn) => {
      state = fn(state);
    });
    const get = jest.fn();
    const api = {} as any;
    
    const slice = createFeature01Slice(set, get, api);
    
    slice.featureActions.setState1('new-state');
    
    expect(state.featureState.state1).toBe('new-state');
  });

  it('should update state2', () => {
    let state = {
      featureState: {
        state1: 'state1',
        state2: 2,
      }
    };
    
    const set = jest.fn((fn) => {
      state = fn(state);
    });
    const get = jest.fn();
    const api = {} as any;
    
    const slice = createFeature01Slice(set, get, api);
    
    slice.featureActions.setState2(42);
    
    expect(state.featureState.state2).toBe(42);
  });
});



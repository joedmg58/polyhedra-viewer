import _ from 'lodash';
import React from 'react';
import { X3dPolyhedron } from '../X3dPolyhedron';

import { shallow } from 'enzyme';
import { defaultConfig } from 'components/configOptions';
import { Polyhedron } from 'math/polyhedra';

let wrapper;

function setup(props) {
  wrapper = shallow(
    <X3dPolyhedron
      config={defaultConfig}
      solidData={Polyhedron.get('tetrahedron').solidData}
      onHover={_.noop}
      {...props}
    />,
  );
}

describe('X3dPolyhedron', () => {
  beforeEach(() => {
    setup();
  });

  it('renders', () => {
    expect(wrapper.find('Edges')).toHaveLength(1);
  });

  it("doesn't fire a click if the mouse has been moved", () => {
    const onClick = jest.fn();
    setup({ onClick });
    const shape = wrapper
      .find('shape')
      .filterWhere(n => !!n.prop('onMouseMove'));

    shape.simulate('mousedown', { hitPnt: [0, 0, 0] });
    shape.simulate('mouseup', { hitPnt: [0, 0, 1] });
    expect(onClick).not.toHaveBeenCalled();

    shape.simulate('mousedown', { hitPnt: [0, 0, 0] });
    shape.simulate('mousemove', { hitPnt: [0, 0, 1] });
    shape.simulate('mouseup', { hitPnt: [0, 0, 0] });
    expect(onClick).not.toHaveBeenCalled();

    shape.simulate('mousedown', { hitPnt: [0, 0, 0] });
    shape.simulate('mouseup', { hitPnt: [0, 0, 0] });
    expect(onClick).toHaveBeenCalled();
  });
});

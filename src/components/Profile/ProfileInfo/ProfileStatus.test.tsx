import React from "react";
import { create } from "react-test-renderer";
import {ProfileStatus} from "./ProfileStatus";


describe("ProfileStatus component", () => {
    test("status from props should be in component", () => {
        const component = create(<ProfileStatus status="new status for test" updateStatus={() => {}}/>);
        const instance = component.getInstance();
        if(instance) {
            expect(instance.props.status).toBe("new status for test");
        }
    });

    test("when the component starts, the span is displayed", () => {
        const component = create(<ProfileStatus status="new status for test" updateStatus={() => {}}/>);
        const instance = component.root;
        if(instance) {
          const span = instance.findByType("span")
            expect(span.children[0]).toBe("new status for test");
        }
    });

    test("after creation <input> should be displayed", () => {
        const component = create(<ProfileStatus status="new status for test" updateStatus={() => {}}/>);
        const instance = component.root;
        if(instance) {

            expect(() => {
                 instance.findByType("input")
            }).toThrowError();
        }
    });

    test("<input> should be displayed in edit mode instead of the <span>", () => {
        const component = create(<ProfileStatus status="new status for test" updateStatus={() => {}}/>);
        const instance = component.root;
        if(instance) {
            const span = instance.findByType("span")
            span.props.onDoubleClick()
            const input = instance.findByType("input")

            expect(input.props.value).toBe("new status for test");
        }
    });
    test("callback should be called", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status="new status for test" updateStatus={mockCallback}/> );
        const instance = component.getInstance();
        if(instance) {
            //instance.deactivateEditMode
            expect(mockCallback.mock.calls.length).toBe(1);
        }
    });
});
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Author from "../pages/Authors/Author/Author";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Author">
                <Author/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews
import path from 'path';
import { imagePath } from '../../data_paths/imagePaths';

describe('Data paths tests:', () => {
    it('Expects a return of base images path', () => {
        const pathString: string = path.join(__dirname, '../../../images/');

        expect(imagePath).toEqual(pathString);
    });
});

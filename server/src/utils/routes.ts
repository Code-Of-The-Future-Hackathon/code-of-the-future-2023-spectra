import { Router } from 'express';
import { allergyRouter } from '../allergy/allergy.router';
import { categoryRouter } from '../category/category.router';
import { clinicalIllnessRouter } from '../clinicalIllness/clinicalIllness.router';
import { formRouter } from '../form/form.router';
import { pharmacyRouter } from '../pharmacy/pharmacy.router';
import { productRouter } from '../product/product.router';
import { userRouter } from '../user/user.router';
import { userPreferencesRouter } from '../userPreferences/userPreferences.router';

const routes = Router();

routes.use('/allergies', allergyRouter);
routes.use('/categories', categoryRouter);
routes.use('/clynicalIlnesses', clinicalIllnessRouter);
routes.use('/forms', formRouter);
routes.use('/pharmacies', pharmacyRouter);
routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/user-preferences', userPreferencesRouter);

export default routes;

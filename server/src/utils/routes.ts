import { Router } from 'express';
import { allergyRouter } from '../allergy/allergy.router';
import { categoryRouter } from '../category/category.router';
import { clinicalIllnessRouter } from '../clinicalIllness/clinicalIllness.router';
import { formRouter } from '../form/form.router';
import { pharmacyRouter } from '../pharmacy/pharmacy.router';
import { productRouter } from '../product/product.router';
import { userRouter } from '../user/user.router';
import { userPreferencesRouter } from '../userPreferences/userPreferences.router';
import { productPharmacyRouter } from '../productPharmacy/productPharmacy.router';
import { userAlergyRouter } from '../userAlergy/userAlergy.router';
import {userClinicalIllnessRouter} from "../userClinicalIllness/userClinicalIllness.router";

const routes = Router();

routes.use('/allergies', allergyRouter);
routes.use('/categories', categoryRouter);
routes.use('/clinical-illnesses', clinicalIllnessRouter);
routes.use('/forms', formRouter);
routes.use('/pharmacies', pharmacyRouter);
routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/user-preferences', userPreferencesRouter);
routes.use('/productPharmacies', productPharmacyRouter);
routes.use('/userAllergies', userAlergyRouter);
routes.use('/userClinicalIllnesses', userClinicalIllnessRouter);

export default routes;

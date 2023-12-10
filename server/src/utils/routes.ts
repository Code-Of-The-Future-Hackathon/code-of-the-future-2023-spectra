import { Router } from 'express';
import { categoryRouter } from '../category/category.router';
import { formRouter } from '../form/form.router';
import { pharmacyRouter } from '../pharmacy/pharmacy.router';
import { productRouter } from '../product/product.router';
import { userRouter } from '../user/user.router';
import { userPreferencesRouter } from '../userPreferences/userPreferences.router';
import { productPharmacyRouter } from '../productPharmacy/productPharmacy.router';
import { userUsedMedicineRouter } from '../userUsedMedicine/userUsedMedicine.router';
import { userProductRouter } from '../userProduct/userProduct.router';
import { userConditionRouter } from '../userCondition/userCondition.router';
import { conditionRouter } from '../condition/condition.router';

const routes = Router();

routes.use('/categories', categoryRouter);
routes.use('/forms', formRouter);
routes.use('/pharmacies', pharmacyRouter);
routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/productPharmacies', productPharmacyRouter);
routes.use('/userPreferences', userPreferencesRouter); //input form from user
routes.use('/userUsedMedicines', userUsedMedicineRouter); 
routes.use('/userProduct', userProductRouter);
routes.use('/userConditions', userConditionRouter);
routes.use('/conditions', conditionRouter);

export default routes;

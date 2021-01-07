import { instance as additionalDataRegistryInstance } from '@civ-clone/core-data-object/AdditionalDataRegistry';
import improvements from './AdditionalData/improvements';

additionalDataRegistryInstance.register(...improvements());

import { IconDefinition, IconName } from '@fortawesome/free-solid-svg-icons';
import faPlus from '@fortawesome/free-solid-svg-icons/faPlus';
import faTrash from '@fortawesome/free-solid-svg-icons/faTrash';

export const icons: { [k in IconName]?: IconDefinition } = {
  plus: faPlus.definition,
  trash: faTrash.definition,
};

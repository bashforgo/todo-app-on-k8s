import { IconDefinition, IconName } from '@fortawesome/free-solid-svg-icons';
import faTrash from '@fortawesome/free-solid-svg-icons/faTrash';

export const icons: { [k in IconName]?: IconDefinition } = {
  trash: faTrash.definition,
};

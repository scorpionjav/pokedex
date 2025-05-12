import Button from '@/components/Button.vue';
import Loader from '@/components/Loader.vue';
import Input from '@/components/Input.vue';
import Icon from '@/components/Icon.vue';
import Modal from '@/components/Modal.vue';

const components = {
  Button,
  Loader,
  Input,
  Icon,
  Modal,
} as {
  Button: typeof Button;
  Loader: typeof Loader;
  Input: typeof Input;
  Icon: typeof Icon;
  Modal: typeof Modal;
};

export default components;

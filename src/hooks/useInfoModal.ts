import { create } from "zustand";

export interface ModalInterface {
  mediaType?: string;
  mediaId?: string;
  isOpen: boolean;
  openModal: (mediaType: string, mediaId: string) => void;
  closeModal: () => void;
}

const useInfoModal = create<ModalInterface>((set) => ({
  mediaType: undefined,
  mediaId: undefined,
  isOpen: false,
  openModal: (mediaType: string, mediaId: string) =>
    set({ isOpen: true, mediaType, mediaId }),
  closeModal: () =>
    set({ isOpen: false, mediaType: undefined, mediaId: undefined }),
}));

export default useInfoModal;

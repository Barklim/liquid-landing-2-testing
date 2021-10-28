import React, { useState } from "react";
import "./Modal.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import PdfModal from "../../components/Pdf";

import { Alert, AlertIcon, AlertTitle, Box } from "@chakra-ui/react";

import Config from "../../utils/config";

function ModalHomePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();

  const [value, setValue] = useState("");

  const [alertProp, setAlert] = useState("lq__alert");

  const [submited, setSubmited] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    // defaultValues: { name: data.name, email: data.email,  tel: data.tel, },
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    // const sendData = {
    //   name: data.name,
    //   phoneNumber: data.tel,
    //   email: data.email,
    // };

    // alert(JSON.stringify(sendData));
    // console.log("!!!");
    // console.log(sendData);
    // console.log("!!!");
    // setTimeout(function () {
    //   onClose();
    // }, 2000);

    setAlert("lq__alert displayVisisble");
    setSubmited(true);

    if (Config.isProd) {
      Config.isTesting
        ? window.ym(85672684, "reachGoal", "sendtoapp")
        : window.ym(85672684, "reachGoal", "send");
    }
  };

  return (
    <>
      {Config.isTesting ? (
        <Button className="button_primary1" onClick={onOpen}>
          Скачать
        </Button>
      ) : (
        <Button className="button_primary1" onClick={onOpen}>
          Получить
        </Button>
      )}

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        size={window.innerWidth > 567 ? "xl" : "full"}
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent onSubmit={handleSubmit(onSubmit)}>
          <form>
            {!Config.isTesting && (
              <ModalHeader className="label">Получить кредит</ModalHeader>
            )}
            {Config.isTesting && !submited && (
              <>
                <div className="modal__testingText modal__testingText_Desktop">
                  {/* На&nbsp;этот&nbsp;номер&nbsp;мы&nbsp;отправим&nbsp;вам
                <br />
                ссылку&nbsp;на&nbsp;приложение */}
                  На этот номер мы отправим вам ссылку&nbsp;на&nbsp;приложение
                </div>
                <div className="modal__testingText modal__testingText_Mobile">
                  На&nbsp;этот&nbsp;номер&nbsp;мы&nbsp;отправим
                  вам&nbsp;ссылку&nbsp;на&nbsp;приложение
                </div>
              </>
            )}
            <ModalCloseButton />
            {!submited && (
              <>
                <ModalBody
                  pb={6}
                  className={
                    Config.isTesting ? "modal__body_testing" : "modal__body"
                  }
                >
                  <div className={alertProp}>
                    <Alert status="success">
                      <AlertIcon />
                      <Box flex="1">
                        <AlertTitle>Успешно отправлено!</AlertTitle>
                      </Box>
                    </Alert>
                  </div>
                  {!Config.isTesting && (
                    <FormControl className="modal__formControl">
                      <FormLabel>
                        Имя <span className="label__star">*</span>
                      </FormLabel>
                      <Input
                        // ref={initialRef}
                        placeholder="Иван"
                        name="name"
                        ref={register({
                          required: true,
                          minLength: {
                            value: 1,
                            message: "Введите имя",
                          },
                        })}
                      />
                      {errors.name?.type === "required" && (
                        <div className="error">Введите имя</div>
                      )}
                    </FormControl>
                  )}

                  <FormControl className="modal__formControl">
                    <FormLabel>
                      Телефон <span className="label__star">*</span>
                    </FormLabel>
                    <PhoneInput
                      defaultCountry="RU"
                      placeholder="+7 (_ _ _) _ _ _ - _ _ - _ _"
                      value={value}
                      onChange={setValue}
                      className="PhoneInputInput"
                      name="tel"
                      control={control}
                      ref={register({
                        required: true,
                        minLength: {
                          value: 1,
                          message: "Введите номер",
                        },
                      })}
                    />
                    {value?.length > 12 && value?.length !== 0 && (
                      <div className="error">Вы ввели слишком много цифр</div>
                    )}
                    {value?.length < 12 &&
                      value?.length !== 0 &&
                      value?.length !== 2 && (
                        <div className="error">
                          Введите корректный номер телефона
                        </div>
                      )}
                    {errors.tel?.type === "required" && (
                      <div className="error">Введите номер телефона</div>
                    )}
                  </FormControl>

                  {!Config.isTesting && (
                    <FormControl mt={4} className="modal__formControl">
                      <FormLabel>Почта</FormLabel>
                      <Input
                        placeholder="example@gmail.com"
                        ref={register({
                          required: false,
                          // pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g,
                        })}
                        name="email"
                      />
                      {errors.email?.type === "required" && (
                        <div className="error">Введите почту</div>
                      )}
                    </FormControl>
                  )}

                  <div className="modal__agreement">
                    <label className="form__customCheckbox">
                      <input
                        type="checkbox"
                        className="form__checkbox"
                        name="agreement"
                        ref={register({
                          required: true,
                        })}
                      ></input>
                      <span></span>
                    </label>
                    <PdfModal>
                      <div className="modal__agreementTextWrap">
                        Соглашаюсь{" "}
                        <span className="modal__agreementText">
                          с правилами обработки&nbsp;
                          {/* <br /> */}
                          персональных данных
                        </span>
                      </div>
                    </PdfModal>
                  </div>
                  {errors.agreement?.type === "required" && (
                    <div className="error">Примите соглашение</div>
                  )}
                </ModalBody>

                <ModalFooter
                  className={
                    Config.isTesting
                      ? "modal__footer modal__footer_testing"
                      : "modal__footer"
                  }
                >
                  <Button
                    type="submit"
                    className="button_primary1"
                    colorScheme="blue"
                    mr={3}
                  >
                    Отправить
                  </Button>

                  <Button
                    className="button_primary1 button_close"
                    onClick={onClose}
                  >
                    Закрыть
                  </Button>
                </ModalFooter>
              </>
            )}
            {submited && (
              <ModalBody pb={6} className="successMessage">
                {Config.isTesting ? (
                  <span>
                    Спасибо за заявку 🎉 <br />
                    <br /> Приложение в разработке, <br /> мы отправим вам SMS
                    когда приложение будет готово.
                  </span>
                ) : (
                  <span>
                    Успешно отправлено 🎉 <br />
                    <br />
                    Мы рассмотрим вашу заявку и ответим в течение следующих 48
                    часов.
                  </span>
                )}
              </ModalBody>
            )}
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalHomePage;

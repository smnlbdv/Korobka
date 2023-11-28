import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation} from 'swiper/modules';

import ButtonCreate from "../../components/buttonCreate/buttonCreate";
import StepsCard from "../../components/stepsCard/stepsCard";
import AnswerCard from "../../components/answerCard/answerCard";
import NewBox from "../../components/newBox/newBox";
import Review from "../../components/review/review";

import style from "./main.module.scss";
import "swiper/css";
import 'swiper/css/navigation';
import './../../libs/swiper.css'

const stepsItem = [
  {
    img: "./assets/step-1.png",
    title: "Выбрать подарок",
    text: "Выберете товар среди более 1 тыс. товаров",
  },
  {
    img: "./assets/step-2.png",
    title: "Выбрать коробку",
    text: "На выбор даны 3 вида коробок",
  },
  {
    img: "./assets/step-3.png",
    title: "Стилизуйте коробку",
    text: "Можете изменить цвет и стиль коробки",
  },
  {
    img: "./assets/step-4.png",
    title: "Добавьте открытку",
    text: "Добавьте милую открытку",
  },
];

const answersWhy = [
  {
    id: 1,
    img: "./assets/answers-1.svg",
    title: "Лидер продаж 2023 года",
    text: "За 2023 год было продано более 10 тыс. коробок",
  },
  {
    id: 2,
    img: "./assets/answers-2.svg",
    title: "Быстрая доставка    ",
    text: "Мы предлагаем быструю и надежную доставку, чтобы ваш подарок пришел вовремя и без проблем",
  },
  {
    id: 3,
    img: "./assets/answers-3.svg",
    title: "Отличное обслуживание",
    text: "Наша команда всегда готова помочь вам с любыми вопросами или проблемами",
  },
  {
    id: 4,
    img: "./assets/answers-4.svg",
    title: "Качественный товар",
    text: "Все наши товары проходят строгий отбор, и мы работаем только с проверенными поставщиками",
  },
  {
    id: 5,
    img: "./assets/answers-5.svg",
    title: "Широкий ассортимент",
    text: "Мы предлагаем огромный выбор подарков для разных возрастов и интересов",
  },
];

const newBoxList = [
  {
    id: 1,
    img: "./assets/new-box-1.png",
    title: "Денежный бокс",
    text: "В каждом боксе находится денежная купюра номиналом 100, 200, 500, 2000 или 5000 рублей",
    price: "50",
  },
  {
    id: 2,
    img: "./assets/new-box-1.png",
    title: "Денежный бокс",
    text: "В каждом боксе находится денежная купюра номиналом 100, 200, 500, 2000 или 5000 рублей",
    price: "50",
  },
  {
    id: 3,
    img: "./assets/new-box-1.png",
    title: "Денежный бокс",
    text: "В каждом боксе находится денежная купюра номиналом 100, 200, 500, 2000 или 5000 рублей",
    price: "50",
  },
  {
    id: 4,
    img: "./assets/new-box-1.png",
    title: "Денежный бокс",
    text: "В каждом боксе находится денежная купюра номиналом 100, 200, 500, 2000 или 5000 рублей",
    price: "50",
  },
  {
    id: 5,
    img: "./assets/new-box-1.png",
    title: "Денежный бокс",
    text: "В каждом боксе находится денежная купюра номиналом 100, 200, 500, 2000 или 5000 рублей",
    price: "50",
  },
  {
    id: 6,
    img: "./assets/new-box-1.png",
    title: "Денежный бокс",
    text: "В каждом боксе находится денежная купюра номиналом 100, 200, 500, 2000 или 5000 рублей",
    price: "50",
  },
];

const reviewsList = [
  {
    id: 1,
    avatar: "./assets/avatar-3.png",
    name: "Сергей",
    lastName: "Матус",
    text: "Никогда не думал, что можно найти подарок, который так точно отражает мою личность, пока не заметил вашего сайта. Было так весело проходить процесс выбора и создавать индивидуальный подарок. Острые косырьки вперед!!!!",
    date: "18 декабря 2023 года",
  },
  {
    id: 2,
    avatar: "./assets/avatar-1.png",
    name: "Семён",
    lastName: "Лебедев",
    text: "Я был полностью в восторге от опыта заказа подарка на вашем сайте! Выбор был огромный, и я смогла найти идеальный подарок для своей любимой девушки. Процесс оформления заказа был прост и интуитивно понятен, а результат превзошел все мои ожидания. Большое спасибо за превосходный сервис!",
    date: "18 декабря 2023 года",
  },
  {
    id: 3,
    avatar: "./assets/avatar-3.png",
    name: "Сергей",
    lastName: "Матус",
    text: "Никогда не думал, что можно найти подарок, который так точно отражает мою личность, пока не заметил вашего сайта. Было так весело проходить процесс выбора и создавать индивидуальный подарок. Острые косырьки вперед!!!!",
    date: "18 декабря 2023 года",
  },
  {
    id: 4,
    avatar: "./assets/avatar-2.png",
    name: "Анасасия",
    lastName: "Самойленко",
    text: "Я регулярно заказываю подарки на вашем сайте, и каждый раз я впечатлена качеством обслуживания. Все мои хотелки были исполнены с большим вниманием к деталям, и подарок пришел во время. И впредь 'Коробка' будете моим первым выбором для подарков!",
    date: "18 декабря 2023 года",
  },
  {
    id: 5,
    avatar: "./assets/avatar-3.png",
    name: "Сергей",
    lastName: "Матус",
    text: "Никогда не думал, что можно найти подарок, который так точно отражает мою личность, пока не заметил вашего сайта. Было так весело проходить процесс выбора и создавать индивидуальный подарок. Острые косырьки вперед!!!!",
    date: "18 декабря 2023 года",
  },
];

const Main = () => {

  const [open, setOpen] = useState(1);

  const openAnswer = (id) => {
    setOpen(id);
  };

  return (
    <>
    <div className="wrapper">
      <section className={style.main_section}>
          <div className={style.flex_box}>
            <div className={style.left_block}>
              <div className={style.text_block}>
                <p>Собери свой</p>
                <div className={style.block_yellow}>
                  <p className={style.text_up_yellow}>идеальный</p>
                  <span className={style.yellow_rectangle}></span>
                </div>
                <p>подарок</p>
              </div>
              <ButtonCreate text={"Собрать"} />
            </div>
            <div className={style.right_block}>
              <img
                className={style.image_main}
                src="./assets/main-img.png"
                alt="surprise box"
              />
            </div>
          </div>
        </section>
        <section className={style.steps_block}>
          <h2 className="section__title">Как собрать подарок?</h2>
          <div className={style.steps_flex}>
            {stepsItem.map((item, index) => (
              <StepsCard
                key={index}
                img={item.img}
                title={item.title}
                text={item.text}
              />
            ))}
          </div>
          <ButtonCreate text={"Собрать"} />
        </section>
        <section className={style.why_us}>
          <h2 className={`${style.section__title} section__title`}>Почему мы?</h2>
          <div className={`${style.answers_block} list_answer`}>
            {answersWhy.map((item, index) => (
              <AnswerCard
                key={index}
                id={item.id}
                image={item.img}
                title={item.title}
                text={item.text}
                openAnswer={openAnswer}
                open={open}
              />
            ))}
          </div>
        </section>
        <section className={style.section_advertising}>
          <div className={style.left_block}>
            <h2 className={style.title_advertising}>Собери подарок сам!</h2>
            <p className={style.text}>
              Если ты ищешь подарок для своей лучшей подруги, что скажешь о
              стильной сумочке или браслете, который она сможет носить на любом
              мероприятии?
            </p>
            <ButtonCreate text={"Собрать"} />
          </div>
          <div className={style.block_woman}>
            <img
              className={style.block_woman_image}
              src="./assets/woman-advertising.png"
              alt="woman"
            />
          </div>
        </section>
        <section className={style.new__list_box}>
          <h2 className="section__title">Новинки</h2>
          <div className={style.new_box_flex}>
            {newBoxList.map((item, index) => (
              <NewBox
                key={index}
                img={item.img}
                title={item.title}
                text={item.text}
                price={item.price}
              />
            ))}
          </div>
        </section>
        <section className={style.partner_block}>
          <h2 className="section__title">Наши партнеры</h2>
          <div className={style.partner_list}>
            <img className={style.image} src="./assets/partner-1.png" alt="" />
            <img className={style.image} src="./assets/partner-1.png" alt="" />
            <img className={style.image} src="./assets/partner-1.png" alt="" />
            <img className={style.image} src="./assets/partner-1.png" alt="" />
            <img className={style.image} src="./assets/partner-1.png" alt="" />
          </div>
        </section>
    </div>
    <div className={style.good_people}>
          <h2 className="section__title">Тысячи довольных пользователей</h2>
    </div>
    <div className={style.swiper}>
        <Swiper
        effect={'coverflow'}
        centeredSlides={true}
        slidesPerView={"auto"}
        initialSlide={1}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: -100,
          modifier: 1,
          slideShadows: true,
        }}
        navigation={true}
        modules={[EffectCoverflow, Navigation]}
        className="mySwiper"
        >
          {reviewsList.map((item, index) => (
            <SwiperSlide key={index}>
              <Review img={item.avatar} name={item.name} lastName={item.lastName} text={item.text} data={item.date}/>
            </SwiperSlide>  
          ))}
        </Swiper>
      </div>
      <div className="wrapper">
        <section className={`${style.section_advertising} ${style.section_question}`}>
          <div className={style.question_block}>
            <div className={style.left_block}>
                <h2 className={style.title_advertising}>Возникли вопросы?</h2>
                <p className={style.text}>
                  Если у вас возникли вопросы наш менедежр ответит вам в течении 10 минут.
                </p>
                <input className={style.input_question} type="text" placeholder="Укажите почту..." />
                <ButtonCreate text={"Отправить"} />
              </div>
              <div className={style.block_woman}>
                <img
                  className={style.block_woman_image}
                  src="./assets/mean-question.png"
                  alt="woman"
                />
              </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Main;

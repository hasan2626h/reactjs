import React, { useContext, useEffect, useState } from "react";
import "./Shop.css";
import HeadInnerPages from "../../components/HeadInnerPages/HeadInnerPages";
import Flex from "../../components/Flex/Flex";
import TopBarBox from "../../components/TopBarBox/TopBarBox";
import {
  BestSellers,
  Category,
  CleaningTools,
  fishesMeats,
  Milks,
  recentReviews,
  SuperMarket,
  TopTags,
  Vegetables,
} from "../../data";
import CardTypeProduct from "../../components/CardTypeProduct/CardTypeProduct";
import BigButton from "../../components/BigButton/BigButton";
import { Link } from "react-router-dom";
import RecentReviews from "../../components/RecentReviews/RecentReviews";
import { ThemeContext } from "../../Context/ThemeContext";
import { TypeContext } from "../../Context/TypeCardsContext";
export default function Shop() {
  //القيمة الدنيا للسعر
  const [min_value, setMin_Value] = useState(0);
  //القيمة العليا للسعر
  const [max_value, setMax_Value] = useState(0);
  //لائحة اخزن بها اللائحة المفلترة حسب السعر لكل كرت
  const [array, setArray] = useState([]);
  //context اسند له قيمة ال id لكل كرت عند الضغط عليه ليفتح صفحة المعلومات الخاصة بنفس الكرت
  const { pr, setPr } = useContext(ThemeContext);
  //لائحة بقوائم المنتجات المتوفرة حسب كل نوع
  const [ArrayProducts] = useState([
    SuperMarket,
    fishesMeats,
    Vegetables,
    Milks,
    CleaningTools,
    BestSellers,
  ]);
  //لائحة فارغة اسند اليها اللائحة ذات الترتيب المساوي للترتيب المرسل عن طريق ال Context TypeName
  const [ArrayUsed, setArrayUsed] = useState([]);
  const { TypeName } = useContext(TypeContext);

  //فتح قائمة المنتجات المختارة حسب الخيار المضغوط عليه في قائمة SecondListHeader
  useEffect(() => {
    for (let i = 0; i < ArrayProducts.length; i++) {
      if (i === TypeName) {
        setArrayUsed(ArrayProducts[TypeName]);
        break;
      } else {
        setArrayUsed(ArrayProducts[0]);
      }
    }
  }, [TypeName]);

  //فلترة كروت المنتجات حسب السعر المحدد بين القيمة العليا والدنيا
  const handleCards = () => {
    setArray(
      ArrayUsed.filter((pro) => pro.price > min_value && pro.price < max_value)
    );
  };

  return (
    <div className="Shop">
      <HeadInnerPages display={"none"} namePage={"Shop"} />
      <Flex className={"LeftRightSectionsShop"}>
        <Flex className={"LeftSectionShop"}>
          <Flex
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <h5 className="titleLeftSec">Showing all two results</h5>
            <Flex className={"selects"}>
              <select>
                <option value="16 products" key="">
                  16 products
                </option>
                <option value="32 products" key="">
                  32 products
                </option>
                <option value="48 products" key="">
                  48 products
                </option>
                <option value="64 products" key="">
                  64 products
                </option>
                <option value="128 products" key="">
                  128 products
                </option>
              </select>
              <select>
                <option value="Popular" key="">
                  Popular
                </option>
                <option value="Featured" key="">
                  Featured
                </option>
                <option value="Top rated" key="">
                  Top rated
                </option>
                <option value="Sorted by latest" key="">
                  Sorted by latest
                </option>
                <option value="Sorted by oldest" key="">
                  Sorted by oldest
                </option>
              </select>
            </Flex>
          </Flex>
          <Flex className={"flexProducts"}>
            {min_value === 0
              ? ArrayUsed.map((pro) => {
                  return (
                    <Link
                      onClick={() => {
                        localStorage.setItem("productInfo", pr);
                        setPr(pro.id);
                      }}
                      to={`/productInfo`}
                    >
                      <CardTypeProduct
                        key={pro.id}
                        img={pro.img}
                        price={"$" + pro.price}
                        content={pro.content}
                      />
                    </Link>
                  );
                })
              : array.map((pro) => {
                  return (
                    <CardTypeProduct
                      key={pro.id}
                      img={pro.img}
                      price={"$" + pro.price}
                      content={pro.content}
                    />
                  );
                })}
          </Flex>
        </Flex>
        <Flex className={"RightSectionShop"}>
          <Flex className={"firstBox"}>
            <TopBarBox title={"Filter by price"} />
            <Flex display={"flex"} alignItems={"center"} gap={"70px"}>
              <h4>Min-Value</h4>
              <input
                className="input"
                onChange={(e) => {
                  setMin_Value(e.target.value);
                }}
                value={min_value}
                placeholder="example: $50"
                type="number"
              />
            </Flex>
            <Flex display={"flex"} alignItems={"center"} gap={"70px"}>
              <h4>Max-Value</h4>
              <input
                className="input"
                value={max_value}
                onChange={(e) => {
                  setMax_Value(e.target.value);
                }}
                placeholder="example: $50"
                type="number"
              />
            </Flex>
            <BigButton
              onClick={() => {
                handleCards();
              }}
              className={"filterButton"}
            >
              Filter
            </BigButton>
          </Flex>
          <Flex className={"secondBox"}>
            <TopBarBox title={"Product Categories"} />
            <ul>
              {Category.map((ca) => {
                return (
                  <Link className="linkCat" to="">
                    <li key={ca.id}>{ca.product}</li>
                  </Link>
                );
              })}
              {TopTags.map((top) => {
                return (
                  <Link className="linkTop" to="">
                    <li key={top.id}>{top.product}</li>
                  </Link>
                );
              })}
            </ul>
          </Flex>
          <Flex className={"ThreeBox"}>
            <TopBarBox title={"Recent reviews"} />
            {recentReviews.map((re) => {
              return (
                <Link
                  onClick={() => {
                    setPr(re.id);
                  }}
                  to="/productInfo"
                >
                  <RecentReviews
                    key={re.id}
                    img={re.img}
                    description={re.description}
                    title={re.title}
                  />
                </Link>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

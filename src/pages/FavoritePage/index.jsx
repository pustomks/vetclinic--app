import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider, theme } from "antd";
import { Button, Tooltip } from "antd";
import { MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "./FavoritePage.module.css";
import {
  deleteAllFavorites,
  toggleFavouritePet,
} from "../../store/slices/favoriteSlice";

export default function FavoritePage() {
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorite);

  const handleDeleteAll = () => {
    dispatch(deleteAllFavorites());
  };

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <div className={styles.mainContainer}>
        <h2>Избранные питомцы</h2>
        {favorite.length > 0 && (
          <Tooltip title="Remove all pets from favorites">
            <Button onClick={handleDeleteAll}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        )}
        <div className={styles.favoritesPageContainer}>
          {favorite.length === 0 ? (
            <p className={styles.favoriteText}>Нет избранных питомцев</p>
          ) : (
            favorite.map((pet) => (
              <div className={styles.favoriteItem} key={pet.id}>
                <span className={styles.petName}>{pet.name}</span>
                <Tooltip title="Remove pet from favorites">
                  <Button onClick={() => dispatch(toggleFavouritePet(pet))}>
                    <MinusOutlined />
                  </Button>
                </Tooltip>
              </div>
            ))
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}

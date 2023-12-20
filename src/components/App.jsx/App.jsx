/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import ArticlesList from '../../pages/ArticlesList/ArticlesList';
import { fetchArticles } from '../../store/articlesSlice';
import { fetchProfile, onLogin } from '../../store/userSlice';
import Layout from '../Layout/Layout';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import ArticleMarkdown from '../../pages/ArticleMarkdown/ArticleMarkdown';
import {
  selectOffset,
  selectisLogin,
  selectIsRemove,
  selectIsCreateArticle,
  selectUser
} from '../../store/selectors';
import CreateAccount from '../../pages/CreateAccount/CreateAccount';
import LoginIn from '../../pages/LoginIn/LoginIn';
import EditAccount from '../../pages/EditAccount/EditAccount';
import NewArticle from '../../pages/NewArticle/NewArticle';
import EditArticle from '../../pages/EditArticle/EditArticle';
import RequireLogin from '../../hoc/RequireLogin';




function App() {
  const dispatch = useDispatch();
  const offset = useSelector(selectOffset);
  const isLogin = useSelector(selectisLogin);

  
  const isRemove = useSelector(selectIsRemove);
  const isCreateArticle = useSelector(selectIsCreateArticle);


  const name = useSelector(selectUser);


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
     
      dispatch(onLogin());

      dispatch(fetchProfile());
    }
  }, [dispatch]);

  useEffect(() => {
    if (isRemove || isCreateArticle) {
      dispatch(fetchArticles(offset));
    }
    dispatch(fetchArticles(offset));
  }, [offset, isRemove, isCreateArticle]);

  useEffect(() => {
    if (name) {
      dispatch(onLogin());
    }
  }, [name]);

  useEffect(() => {
    if (isLogin) {
      dispatch(fetchProfile());
    }
  }, [isLogin]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticlesList />} />
          <Route path="articles" element={<ArticlesList />} />
          <Route path="articles/:slug" element={<ArticleMarkdown />} />
          <Route
            path="new-article"
            element={
              <RequireLogin>
                <NewArticle />
              </RequireLogin>
            }
          />
          <Route
            path="articles/:slug/edit"
            element={
              <RequireLogin>
                <EditArticle />
              </RequireLogin>
            }
          />
          <Route path="sign-up" element={<CreateAccount />} />
          <Route path="sign-in" element={<LoginIn />} />
          <Route path="profile" element={<EditAccount />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
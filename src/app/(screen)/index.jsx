import React, { useEffect, useRef, useState } from "react";
import { Platform, TouchableOpacity, View, FlatList, ActivityIndicator, Image, ScrollView } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppLayout from "../../components/layout/AppLayout";
import HomePreloader from "../../components/perloader/HomePreloader";
import PostCard from "~/components/molecules/PostCard";
import PostCommentBottomSheet from "~/components/molecules/PostCommentBottomSheet";
import { fetchPost } from "~/services/authService";
import { RefreshControl } from "react-native-gesture-handler";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const [isFetchingMore, setIsFetchingMore] = useState(false); // For loading more
  const sheetRef = useRef(null);
  const [comments, setComments] = useState([]);

  const fetchPosts = async (page = 1, append = false) => {
    try {
      const { status, data } = await fetchPost(page); // Assume `fetchPost` accepts a `page` parameter
      if (status) {
        setPosts((prevPosts) => (append ? [...prevPosts, ...data.data[0].data] : data.data[0].data));
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setIsFetchingMore(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1); // Reset to page 1
    await fetchPosts();
  };

  const loadMorePosts = async () => {
    if (isFetchingMore) return;
    setIsFetchingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchPosts(nextPage, true); // Fetch additional posts
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <View style={{ marginBottom: 110 }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  };

  return (
    <AppLayout>
      <View>
        <FlatList
          data={posts}
          ListEmptyComponent={<HomePreloader />}
          style={{ paddingTop: 38, paddingHorizontal: 10 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (<PostCard key={index} data={item} openBottomSheet={(e) => { setComments(e); sheetRef.current?.present() }} />)}
          onEndReached={loadMorePosts}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={() => <View style={{height:20}} />}
          refreshControl={
            <RefreshControl
              style={{ position: "relative", top: 1000, display: "none" }}
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#4CAF50"]}
              tintColor="#4CAF50"
            />
          }
          ListHeaderComponent={
            <View className="h-14 items-center px-3 gap-3 flex-row sticky top-0">
              <View className="flex-grow">
                <Image source={require("../../assets/images/inappLogo.png")} style={{ width: 75, height: 22 }} />
              </View>
              <View>
                <AntDesign name="search1" size={25} />
              </View>
              <TouchableOpacity className="relative">
                <Ionicons name="notifications-outline" size={25} />
                <View className="bg-danger rounded-full h-2 w-2 absolute right-[4px] top-1" />
              </TouchableOpacity>
            </View>
          }
          ListFooterComponent={renderFooter}
          contentContainerStyle={{ paddingBottom: Platform.OS === "android" ? 32 : 32 }}
        />
      </View>
      <PostCommentBottomSheet post_id={comments} sheetRef={sheetRef} />
    </AppLayout>

  );
}

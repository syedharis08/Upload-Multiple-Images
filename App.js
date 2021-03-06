import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';

import ImageView from 'react-native-image-view';

const {width} = Dimensions.get('window');
const height = width * 1;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: Platform.select({ios: 0, android: 10}),
  },
  tabs: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    height: 30,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  tabTitle: {
    color: '#EEE',
  },
  tabTitleActive: {
    fontWeight: '700',
    color: '#FFF',
  },
  footer: {
    width,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  footerButton: {
    flexDirection: 'row',
    marginLeft: 15,
  },
  footerText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
  button: {
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  logo: {
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      images: [],
      newImages: [],
      index: 0,
      imageIndex: 0,
      isImageViewVisible: false,
    };
  }

  pickMultiple() {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
    })
      .then(images => {
        this.setState({
          image: null,
          images: images.map(i => {
            this.setState({
              newImages: [
                ...this.state.newImages,
                {
                  source: {uri: i.path},
                },
              ],
            });
            return {
              uri: i.path,
              width,
              height,
            };
          }),
        });

        console.log(this.state.newImages);
      })
      .catch(e => alert(e));
  }

  renderImage(image) {
    return (
      <Image style={{width, height, resizeMode: 'contain'}} source={image} />
    );
  }

  renderAsset(image) {
    return this.renderImage(image);
  }

  render() {
    const {isImageViewVisible, imageIndex} = this.state;
    const images = this.state.newImages;
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.logo}
          onPress={this.pickMultiple.bind(this)}
          style={styles.button}>
          <Icon name={'paperclip'} size={50} color="black" />
        </TouchableOpacity>
        <View>
          {images.map((image, index) => (
            <TouchableOpacity
              key={image.uri}
              onPress={() => {
                this.setState({
                  imageIndex: index,
                  isImageViewVisible: true,
                });
              }}>
              <Image
                style={{width, height}}
                source={image.source}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>

        <ImageView
          glideAlways
          images={images}
          imageIndex={imageIndex}
          animationType="fade"
          isVisible={isImageViewVisible}
          onClose={() => this.setState({isImageViewVisible: false})}
          onImageChange={index => {
            console.log(index);
          }}
        />
      </ScrollView>
    );
  }
}

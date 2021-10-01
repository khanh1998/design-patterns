package main

import "fmt"

type Observer interface {
	Update(event string) bool
}

type Subject interface {
	Subcribe(observer Observer, event string) bool
	Unsubcribe(observer Observer, event string) bool
	NotifyAll(event string) bool
}

type Youtube struct {
	channels   []string
	chanToSubs map[string][]Observer
}

func NewYoutube(channels []string) *Youtube {
	chanToSubs := map[string][]Observer{}
	for _, channel := range channels {
		chanToSubs[channel] = []Observer{}
	}
	channels = append(channels)
	return &Youtube{
		channels:   channels,
		chanToSubs: chanToSubs,
	}
}

func (y *Youtube) isChannelExist(channel string) bool {
	for _, ch := range y.channels {
		if ch == channel {
			return true
		}
	}
	return false
}

func (y *Youtube) Subcribe(user Observer, channel string) bool {
	if y.isChannelExist(channel) {
		y.chanToSubs[channel] = append(y.chanToSubs[channel], user)
	}
	return false
}

func (y *Youtube) Unsubcribe(user Observer, channel string) bool {
	if y.isChannelExist(channel) {
		subs := y.chanToSubs[channel]
		userIndex := -1
		for index, currUser := range subs {
			if currUser == user {
				userIndex = index
			}
		}
		if userIndex > -1 {
			subs = append(subs[:userIndex], subs[userIndex+1:]...)
			return true
		}
	}
	return false
}

func (y *Youtube) NotifyAll(channel string) bool {
	for _, user := range y.chanToSubs[channel] {
		user.Update(channel)
	}
	return true
}

type User struct {
	name string
}

func NewUser(name string) *User {
	return &User{
		name: name,
	}
}

func (u *User) Update(channel string) bool {
	fmt.Printf("%v gonna watch new videos on %v\r\n", u.name, channel)
	return true
}

func main() {
	channels := []string{"sbs", "tvn", "hbo"}
	youtube := NewYoutube(channels)

	kDramaHolic := User{
		name: "So Yoon",
	}

	cartoonHolic := User{
		name: "Ben",
	}

	youtube.Subcribe(&kDramaHolic, channels[0])
	youtube.Subcribe(&kDramaHolic, channels[1])
	youtube.Subcribe(&cartoonHolic, channels[2])

	youtube.NotifyAll(channels[2])
	youtube.NotifyAll(channels[1])
	youtube.NotifyAll(channels[0])
}

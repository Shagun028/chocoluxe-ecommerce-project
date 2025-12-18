package com.choco.backend.service;

import com.choco.backend.model.Subscription;
import com.choco.backend.model.User;
import com.choco.backend.repository.SubscriptionRepository;
import com.choco.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;

    public Subscription createSubscription(Subscription subscription, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        subscription.setUser(user);
        return subscriptionRepository.save(subscription);
    }

    public List<Subscription> getUserSubscriptions(Long userId) {
        return subscriptionRepository.findByUserId(userId);
    }

    public Subscription updateSubscription(Long id, Subscription subscriptionDetails) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));

        subscription.setSubscriptionType(subscriptionDetails.getSubscriptionType());
        subscription.setPrice(subscriptionDetails.getPrice());
        subscription.setChocolateBarsPerMonth(subscriptionDetails.getChocolateBarsPerMonth());
        subscription.setPreferences(subscriptionDetails.getPreferences());
        subscription.setStatus(subscriptionDetails.getStatus());

        return subscriptionRepository.save(subscription);
    }

    public void cancelSubscription(Long id) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));

        subscription.setStatus("CANCELLED");
        subscriptionRepository.save(subscription);
    }
}
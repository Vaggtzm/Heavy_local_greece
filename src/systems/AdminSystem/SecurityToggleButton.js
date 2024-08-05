/*
 * Copyright (c) 2024. MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { useState, useEffect } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';

const SecurityToggleButton = () => {
    const [isUnderAttack, setIsUnderAttack] = useState(false);
    const [loading, setLoading] = useState(true);

    // Initialize Firebase functions
    const functions = getFunctions();
    const toggleSecurityLevel = httpsCallable(functions, 'toggleCloudflareSecurityLevel');

    useEffect(() => {
        const fetchCurrentSecurityLevel = async () => {
            try {
                const result = await toggleSecurityLevel({ display: true });
                if (result.data.success) {
                    setIsUnderAttack(result.data.data.result.value === 'under_attack');
                } else {
                    console.error('Failed to fetch current security level.');
                }
            } catch (error) {
                console.error('Error fetching security level:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentSecurityLevel();
    }, [toggleSecurityLevel]);

    const handleClick = async () => {
        setLoading(true);
        try {
            const action = !isUnderAttack;
            const result = await toggleSecurityLevel({ display: false, action });
            if (result.data.success) {
                setIsUnderAttack(action);
            } else {
                console.error('Failed to toggle security level.');
            }
        } catch (error) {
            console.error('Error toggling security level:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <button className="btn btn-primary" disabled>Loading...</button>;
    }

    return (
        <button
            className={`btn ${isUnderAttack ? 'btn-warning' : 'btn-danger'}`}
            onClick={handleClick}
        >
            {isUnderAttack ? 'Disable Under Attack Mode' : 'Enable Under Attack Mode'}
        </button>
    );
};

export default SecurityToggleButton;